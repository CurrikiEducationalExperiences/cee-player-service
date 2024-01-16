const { PlatformController } = require("../../controllers/platform");
const { PlatformService } = require("../../services/platform");

describe("controller/platform", () => {
  describe("registerPlatform", () => {
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
      jest.spyOn(PlatformService, "registerPlatform").mockResolvedValueOnce(result);
      await PlatformController.registerPlatform(req, res, next);
      expect(res.result).toEqual(result);
    });
  });

  describe("getPlatforms", () => {
    it("should get all registered platforms", async () => {
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
      jest.spyOn(PlatformService, "getPlatforms").mockResolvedValueOnce(result);
      await PlatformController.getPlatforms(req, res, next);
      expect(res.result).toEqual(result);
    });
  });

  describe("deletePlatform", () => {
    it("should delete a platform", async () => {
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
      jest.spyOn(PlatformService, "deletePlatform").mockResolvedValueOnce(result);
      await PlatformController.deletePlatform(req, res, next);
      expect(res.result).toEqual(result);
    });
  });

  
});
