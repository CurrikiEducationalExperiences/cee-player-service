const { LicenseeController } = require("../../controllers/licensee");
const { LicenseeService } = require("../../services/licensee");

describe("controller/licensee", () => {
  describe("AddLicensee", () => {
    it("should add a licensee", async () => {
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
      jest.spyOn(LicenseeService, "addLicensee").mockResolvedValueOnce(result);
      await LicenseeController.addLicensee(req, res, next);
      expect(res.result).toEqual(result);
    });
  });

  describe("getPlatforms", () => {
    it("should get all licensee data", async () => {
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
      jest.spyOn(LicenseeService, "getLicensees").mockResolvedValueOnce(result);
      await LicenseeController.getLicensees(req, res, next);
      expect(res.result).toEqual(result);
    });
  });

  describe("updateLicensee", () => {
    it("should update a licensee", async () => {
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
      jest
        .spyOn(LicenseeService, "updateLicensee")
        .mockResolvedValueOnce(result);
      await LicenseeController.updateLicensee(req, res, next);
      expect(res.result).toEqual(result);
    });

    describe("deleteLicensee", () => {
      it("should delete a licensee", async () => {
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
        jest
          .spyOn(LicenseeService, "deleteLicensee")
          .mockResolvedValueOnce(result);
        await LicenseeController.deleteLicensee(req, res, next);
        expect(res.result).toEqual(result);
      });
    });
  });
});
