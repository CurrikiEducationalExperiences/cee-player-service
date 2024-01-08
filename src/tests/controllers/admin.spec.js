const { AdminController } = require("../../controllers/admin");
const { AdminService } = require("../../service/admin");

describe("controller/admin", () => {
  describe("register", () => {
    it("should register a user", async () => {
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
      jest.spyOn(AdminService, "register").mockResolvedValueOnce(result);
      await AdminController.register(req, res, next);
      expect(res.result).toEqual(result);
    });
  });

  describe("login", () => {
    it("should login a user", async () => {
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
      jest.spyOn(AdminService, "login").mockResolvedValueOnce(result);
      await AdminController.login(req, res, next);
      expect(res.result).toEqual(result);
    });
  });

  describe("getProfile", () => {
    it("should get profile of aigned in user", async () => {
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
      jest.spyOn(AdminService, "getProfile").mockResolvedValueOnce(result);
      await AdminController.getProfile(req, res, next);
      expect(res.result).toEqual(result);
    });
  });

  describe("verifyToken", () => {
    it("should validate the reset password token", async () => {
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
      jest.spyOn(AdminService, "verifyToken").mockResolvedValueOnce(result);
      await AdminController.getProfile(req, res, next);
      expect(res.result).toEqual(result);
    });
  });

  describe("updatePassword", () => {
    it("should update signed in user", async () => {
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
      jest.spyOn(AdminService, "updatePassword").mockResolvedValueOnce(result);
      await AdminController.updatePassword(req, res, next);
      expect(res.result).toEqual(result);
    });
  });

  describe("forgetPassword", () => {
    it("should send the email with OTP", async () => {
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
      jest.spyOn(AdminService, "forgetPassword").mockResolvedValueOnce(result);
      await AdminController.forgetPassword(req, res, next);
      expect(res.result).toEqual(result);
    });
  });

  describe("resetPassword", () => {
    it("should reset the password", async () => {
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
      jest.spyOn(AdminService, "resetPassword").mockResolvedValueOnce(result);
      await AdminController.resetPassword(req, res, next);
      expect(res.result).toEqual(result);
    });
  });
});
