const { ltiController } = require("../../controllers/lti");
const { ltiService } = require("../../service/lti");

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
      jest.spyOn(ltiService, "grade").mockResolvedValueOnce(result);
      await ltiController.grade(req, res, next);
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
      jest.spyOn(ltiService, "members").mockResolvedValueOnce(result);
      await ltiController.members(req, res, next);
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
      jest.spyOn(ltiService, "deeplink").mockResolvedValueOnce(result);
      await ltiController.deeplink(req, res, next);
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
      jest.spyOn(ltiService, "info").mockResolvedValueOnce(result);
      await ltiController.info(req, res, next);
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
      jest.spyOn(ltiService, "resources").mockResolvedValueOnce(result);
      await ltiController.resources(req, res, next);
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
      jest.spyOn(ltiService, "stream").mockResolvedValueOnce(result);
      await ltiController.stream(req, res, next);
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
      jest.spyOn(ltiService, "xapi").mockResolvedValueOnce(result);
      await ltiController.xapi(req, res, next);
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
      jest.spyOn(ltiService, "registerPlatform").mockResolvedValueOnce(result);
      await ltiController.registerPlatform(req, res, next);
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
      jest.spyOn(ltiService, "canvasConfigJson").mockResolvedValueOnce(result);
      await ltiController.canvasConfigJson(req, res, next);
      expect(res.result).toEqual(result);
    });
  });


});
