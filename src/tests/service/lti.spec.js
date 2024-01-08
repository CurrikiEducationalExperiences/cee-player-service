const lti = require("ltijs").Provider;
const axios = require("axios");
const { ltiService } = require("../../service/lti");
const { PlatformSettings } = require("../../../models/platformSettings");
const ERROR_CODES = require("../../constant/error-messages");
const SUCCESS_CODES = require("../../constant/success-messages");

jest.mock("../../../models/platformSettings", () => ({
  PlatformSettings: {
    findOne: jest.fn(),
  },
}));
jest.mock("axios");
jest.mock("ltijs", () => {
  return {
    Provider: {
      NamesAndRoles: { getMembers: jest.fn() },
      registerPlatform: jest.fn(),
      Grade: {
        getLineItems: jest.fn(),
        createLineItem: jest.fn(),
        submitScore: jest.fn(),
      },
      DeepLinking: {
        createDeepLinkingForm: jest.fn(),
      },
    },
  };
});

describe("service/lti", () => {
  beforeEach(() => {
    PlatformSettings.findOne.mockReset();
  });
  afterEach(() => {
    jest.resetAllMocks();
  });

  describe("members", () => {
    let res;
    beforeEach(() => {
      res = {
        locals: {
          token: "mock-token",
        },
        send: jest.fn(),
        sendStatus: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };
    });

    it("should send members when successful response is received", async () => {
      const mockMembers = ["member1", "member2"];
      lti.NamesAndRoles.getMembers.mockResolvedValueOnce({
        members: mockMembers,
      });
      await ltiService.members({}, res);
      expect(lti.NamesAndRoles.getMembers).toHaveBeenCalledWith("mock-token");
      expect(res.send).toHaveBeenCalledWith(mockMembers);
      expect(res.sendStatus).not.toHaveBeenCalled();
    });

    it("should handle errors and send a 500 status with the error message", async () => {
      const errorMessage = "An error occurred";
      lti.NamesAndRoles.getMembers.mockRejectedValueOnce(
        new Error(errorMessage)
      );
      await ltiService.members(null, res);
      expect(lti.NamesAndRoles.getMembers).toHaveBeenCalledWith("mock-token");
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalledWith(errorMessage);
      expect(res.sendStatus).not.toHaveBeenCalled();
    });
  });

  describe("grade", () => {
    let res;
    let req;
    beforeEach(() => {
      req = {
        body: {
          grade: 80,
        },
      };
      res = {
        locals: {
          token: {
            user: "1234567890",
            platformContext: {
              endpoint: {
                lineItem: "abc",
              },
              resource: {
                id: 12345,
              },
            },
          },
        },
        send: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };
    });

    it("should create and submit grade when lineitem id is not received and line items from lti is empty array", async () => {
      res.locals.token.platformContext.endpoint.lineitem = null;
      lti.Grade.getLineItems.mockResolvedValueOnce({ lineItems: [] });
      lti.Grade.createLineItem.mockResolvedValueOnce({ id: 1234567890 });
      lti.Grade.submitScore.mockResolvedValueOnce(true);
      await ltiService.grade(req, res);
      expect(res.send).toHaveBeenCalledWith(true);
    });

    it("should create and submit grade when lineitem id is not received and line items from lti is not an empty array", async () => {
      res.locals.token.platformContext.endpoint.lineitem = null;
      lti.Grade.getLineItems.mockResolvedValueOnce({
        lineItems: [{ id: 1212 }],
      });
      lti.Grade.submitScore.mockResolvedValueOnce(true);
      await ltiService.grade(req, res);
      expect(res.send).toHaveBeenCalledWith(true);
    });

    it("should create and submit grade when lineitem id is received", async () => {
      res.locals.token.platformContext.endpoint.lineitem = true;
      lti.Grade.submitScore.mockResolvedValueOnce(true);
      await ltiService.grade(req, res);
      expect(res.send).toHaveBeenCalledWith(true);
    });

    it("should handle errors and send a 500 status with the error message", async () => {
      const errorMessage = "An error occurred";
      res.locals.token.platformContext.endpoint.lineitem = true;
      lti.Grade.submitScore.mockResolvedValueOnce(new Error(errorMessage));
      await ltiService.grade(req, res);
      expect(res.send).toHaveBeenCalled();
    });
  });

  describe("deeplink", () => {
    let res;
    let req;
    beforeEach(() => {
      process.env.NODE_APP_BASEURL = "www.google.com/";
      req = {
        body: {
          title: "a",
          name: "a",
          value: "a",
          id: "1",
        },
      };
      res = {
        locals: {
          token: "eytr.ghty.tf4f",
        },
        send: jest.fn(),
        sendStatus: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };
    });

    it("should create the deeplinking form", async () => {
      lti.DeepLinking.createDeepLinkingForm.mockResolvedValueOnce(true);
      await ltiService.deeplink(req, res);
      expect(res.send).toHaveBeenCalledWith(true);
    });

    it("should send 500", async () => {
      lti.DeepLinking.createDeepLinkingForm.mockResolvedValueOnce(null);
      await ltiService.deeplink(req, res);
      expect(res.sendStatus).toHaveBeenCalledWith(500);
    });

    it("should send 500 in case of error", async () => {
      const errorMessage = 'An Error Occured'
      lti.DeepLinking.createDeepLinkingForm.mockResolvedValueOnce(new Error(errorMessage));
      await ltiService.deeplink(req, res);
      expect(res.send).toHaveBeenCalled();
    });
  });

  describe("info", () => {
    let req;
    let res;

    beforeEach(() => {
      req = {};

      res = {
        send: jest.fn(),
        locals: {
          token: "mock-token",
          context: "mock-context",
        },
      };
    });

    it("should get the info", async () => {
      await ltiService.info(req, res);
      expect(res.send).toHaveBeenCalledWith({
        token: "mock-token",
        context: "mock-context",
      });
    });
  });

  describe("resources", () => {
    let req;
    let res;
    jest.mock("axios");

    beforeEach(() => {
      req = {
        query: {
          page: "1",
          limit: "10",
          query: "test",
        },
      };

      res = {
        locals: {
          token: { clientId: "mock-client-id" },
        },
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };
    });

    it("should return error for invalid query params", async () => {
      req.query.query = 1;
      await ltiService.resources(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
    });

    it("should return error for no matching platform", async () => {
      PlatformSettings.findOne.mockResolvedValueOnce(null);
      await ltiService.resources(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
    });

    it("should fetch resources", async () => {
      PlatformSettings.findOne.mockResolvedValueOnce({
        cee_provider_url: "mock-provider-url",
        cee_licensee_id: "mock-licensee-id",
        cee_secret_key: "mock-secret-key",
      });
      jest.spyOn(axios, "get").mockResolvedValueOnce({ data: true });
      await ltiService.resources(req, res);
      expect(res.send).toHaveBeenCalledWith(true);
    });
  });

  describe("stream", () => {
    let res;
    let req;
    beforeEach(() => {
      req = {
        query: {
          ceeId: "1qwe123",
        },
      };
      res = {
        locals: {
          token: {
            clientId: 12345,
          },
        },
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
        writeHead: jest.fn(),
      };
    });

    it("should return error no matching platform found", async () => {
      PlatformSettings.findOne.mockResolvedValueOnce(null);
      await ltiService.stream(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
    });

    it("should return the file to be streamed", async () => {
      PlatformSettings.findOne.mockResolvedValueOnce({
        cee_licensee_id: "zxczxc",
        cee_secret_key: "mkjn",
        cee_provider_url: "ioo90o",
      });
      jest
        .spyOn(axios, "post")
        .mockResolvedValueOnce({
          data: true,
          headers: { "content-length": 10 },
        });
      await ltiService.stream(req, res);
      expect(res.writeHead).toHaveBeenCalledWith(200, {
        "Content-Disposition": 'attachment; filename="1qwe123.c2e"',
        "Content-Length": 10,
        "Content-Type": "application/zip",
      });
    });
  });

  describe("xapi", () => {
    let res;
    let req;
    beforeEach(() => {
      req = {
        body: {
          id: "1qwe123",
          verb: {
            id: "http://activitystrea.ms/schema/1.0/consume",
            display: {
              "en-US": "consumed",
            },
          },
        },
      };
      res = {
        locals: {
          token: {
            clientId: 12345,
          },
        },
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
        writeHead: jest.fn(),
      };
    });

    it("should return error no matching platform found", async () => {
      PlatformSettings.findOne.mockResolvedValueOnce(null);
      await ltiService.xapi(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
    });

    it("should return error for invalid inputs", async () => {
      req.body.id = null;
      PlatformSettings.findOne.mockResolvedValueOnce(true);
      await ltiService.xapi(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
    });

    it("should return the file to be streamed", async () => {
      PlatformSettings.findOne.mockResolvedValueOnce({
        cee_licensee_id: "zxczxc",
        cee_secret_key: "mkjn",
        cee_provider_url: "ioo90o",
      });
      jest.spyOn(axios, "post").mockResolvedValueOnce({ data: true });
      await ltiService.xapi(req, res);
      expect(res.send).toHaveBeenCalledWith(true);
    });
  });

  describe("registerPlatform", () => {
    let req;
    let res;

    beforeEach(() => {
      req = {
        body: {
          url: "xxxxxxxxxxxxxxx",
          name: "xxxxxxxxxxxxxxx",
          clientId: "xxxxxxxxxxxxxxx",
          authenticationEndpoint: "xxxxxxxxxxxxxxx",
          accesstokenEndpoint: "xxxxxxxxxxxxxxx",
          authConfigMethod: "xxxxxxxxxxxxxxx",
          authConfigKey: "xxxxxxxxxxxxxxx",
          secret: "xxxxxxxxxxxxxxx",
        },
      };

      res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };
    });

    it("should return an error if the secret is invalid", async () => {
      process.env.ADMIN_SECRET = "valid-secret";
      req.body.secret = "invalid-secret";
      await ltiService.registerPlatform(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.send).toHaveBeenCalledWith(
        ERROR_CODES.INVALID_PARAMETERS.message
      );
    });

    it("should register the platform and return success", async () => {
      process.env.ADMIN_SECRET = "xxxxxxxxxxxxxxx";
      req.body.secret = "xxxxxxxxxxxxxxx";
      jest.spyOn(lti, "registerPlatform").mockResolvedValueOnce(true);
      await ltiService.registerPlatform(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith(
        SUCCESS_CODES.PLATFORM_REGISTERED_SUCCESSFULLY.message
      );
    });
  });

  describe("canvasConfigJson", () => {
    let req;
    let res;

    beforeEach(() => {
      req = {};

      res = {
        setHeader: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };
    });

    it("should return canvas config json", async () => {
      await ltiService.canvasConfigJson(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.setHeader).toHaveBeenCalledWith('Content-Type', 'application/json');
    });
  });
});
