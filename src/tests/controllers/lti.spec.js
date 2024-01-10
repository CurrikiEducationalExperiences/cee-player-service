const { LtiController } = require("../../controllers/lti");
const { LtiService } = require("../../services/lti");

describe("controller/routes", () => {
  describe("grade", () => {
    it("should submit a grade", async () => {
      const req = {};
      const result = {
        code: 200,
        data: [],
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        result,
      };
      const next = jest.fn();
      jest.spyOn(LtiService, "grade").mockResolvedValueOnce(result);
      await LtiController.grade(req, res, next);
      expect(res.result).toEqual(result);
    });
  });

  describe("members", () => {
    it("should get members", async () => {
      const req = {};
      const result = {
        code: 200,
        data: [],
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        result,
      };
      const next = jest.fn();
      jest.spyOn(LtiService, "members").mockResolvedValueOnce(result);
      await LtiController.members(req, res, next);
      expect(res.result).toEqual(result);
    });
  });

  describe("deeplink", () => {
    it("should return deeplink form", async () => {
      const req = {};
      const result = {
        code: 200,
        data: [],
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        result,
      };
      const next = jest.fn();
      jest.spyOn(LtiService, "deeplink").mockResolvedValueOnce(result);
      await LtiController.deeplink(req, res, next);
      expect(res.result).toEqual(result);
    });
  });

  describe("info", () => {
    it("should return info", async () => {
      const req = {};
      const result = {
        code: 200,
        data: [],
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        result,
      };
      const next = jest.fn();
      jest.spyOn(LtiService, "info").mockResolvedValueOnce(result);
      await LtiController.info(req, res, next);
      expect(res.result).toEqual(result);
    });
  });

  describe("resources", () => {
    it("should return resources", async () => {
      const req = {};
      const result = {
        code: 200,
        data: [],
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        result,
      };
      const next = jest.fn();
      jest.spyOn(LtiService, "resources").mockResolvedValueOnce(result);
      await LtiController.resources(req, res, next);
      expect(res.result).toEqual(result);
    });
  });

  describe("stream", () => {
    it("should stream a file", async () => {
      const req = {};
      const result = {
        code: 200,
        data: [],
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        result,
      };
      const next = jest.fn();
      jest.spyOn(LtiService, "stream").mockResolvedValueOnce(result);
      await LtiController.stream(req, res, next);
      expect(res.result).toEqual(result);
    });
  });

  describe("xapi", () => {
    it("should return xapi statements", async () => {
      const req = {};
      const result = {
        code: 200,
        data: [],
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        result,
      };
      const next = jest.fn();
      jest.spyOn(LtiService, "xapi").mockResolvedValueOnce(result);
      await LtiController.xapi(req, res, next);
      expect(res.result).toEqual(result);
    });
  });

  describe("platform register", () => {
    it("should register a platform", async () => {
      const req = {};
      const result = {
        code: 200,
        data: [],
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        result,
      };
      const next = jest.fn();
      jest.spyOn(LtiService, "registerPlatform").mockResolvedValueOnce(result);
      await LtiController.registerPlatform(req, res, next);
      expect(res.result).toEqual(result);
    });
  });

  describe("canvas config json", () => {
    it("should return canvas config json", async () => {
      const req = {};
      const result = {
        code: 200,
        data: [],
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        result,
      };
      const next = jest.fn();
      jest.spyOn(LtiService, "canvasConfigJson").mockResolvedValueOnce(result);
      await LtiController.canvasConfigJson(req, res, next);
      expect(res.result).toEqual(result);
    });
  });


});
