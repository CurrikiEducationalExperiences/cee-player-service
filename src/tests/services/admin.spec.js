const bcrypt = require("bcrypt");
const { AdminService } = require("../../services/admin");
const { Admins } = require("../../../models/admins");
const {
  validatePasswordToken,
  issueResetPassToken,
  issueToken,
} = require("../../middleware/auth");
const { ResetPasswordTokens } = require("../../../models/resetPasswordTokens");
const ERROR_CODES = require("../../constant/error-messages");
const { EmailService } = require("../../utils/email");

jest.mock("../../../models/admins", () => ({
  Admins: {
    create: jest.fn(),
    update: jest.fn(),
    destroy: jest.fn(),
    findOne: jest.fn(),
  },
}));
jest.mock("../../../models/resetPasswordTokens", () => ({
  ResetPasswordTokens: {
    findOne: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    destroy: jest.fn(),
  },
}));
jest.mock("../../middleware/auth", () => ({
  validatePasswordToken: jest.fn(),
  issueToken: jest.fn(),
  issueResetPassToken: jest.fn(),
}));
jest.mock("bcrypt", () => ({
  hashSync: jest.fn(),
  compare: jest.fn(),
  genSaltSync: jest.fn(),
}));
describe("service/admins", () => {
  beforeEach(() => {
    Admins.create.mockReset();
    Admins.update.mockReset();
    Admins.destroy.mockReset();
    Admins.findOne.mockReset();
  });
  afterEach(() => {
    jest.resetAllMocks();
  });

  describe("register()", () => {
    let registerationDetails = {
      email: "mehmood.hussain@tkxel246.com",
      password: "Mehmood@Curriki1",
    };

    it(`should throw error ${ERROR_CODES.USER_ALREADY_EXISTS.message}`, async () => {
      try {
        Admins.findOne.mockResolvedValueOnce({ abcd: "abcd" });
        await AdminService.register(registerationDetails);
      } catch (error) {
        expect(error.message).toBeDefined();
        expect(error.message).toEqual(ERROR_CODES.USER_ALREADY_EXISTS.message);
      }
    });

    it(`should create a user`, async () => {
      registerationDetails.password = "Mehmood@Curriki1";
      Admins.findOne.mockResolvedValueOnce(null);
      const response = await AdminService.register(registerationDetails);
      expect(response).toBeDefined();
      expect(response).toBe(true);
    });
  });

  describe("login()", () => {
    const loginCreds = {
      email: "mehmood.hussain@tkxel246.com",
      password: "password",
    };

    it(`should throw error ${ERROR_CODES.INVALID_EMAIL_PASSWORD.message}`, async () => {
      try {
        Admins.findOne.mockResolvedValueOnce(null);
        await AdminService.login(loginCreds);
      } catch (error) {
        expect(error.message).toBeDefined();
        expect(error.message).toEqual(
          ERROR_CODES.INVALID_EMAIL_PASSWORD.message
        );
      }
    });

    it(`should throw error ${ERROR_CODES.INVALID_EMAIL_PASSWORD.message}`, async () => {
      try {
        Admins.findOne.mockResolvedValueOnce({ password: "123" });
        jest.spyOn(bcrypt, "compare").mockResolvedValueOnce(false);
        await AdminService.login(loginCreds);
      } catch (error) {
        expect(error.message).toBeDefined();
        expect(error.message).toEqual(
          ERROR_CODES.INVALID_EMAIL_PASSWORD.message
        );
      }
    });

    it(`should login a user`, async () => {
      Admins.findOne.mockResolvedValueOnce({ password: "123" });
      jest.spyOn(bcrypt, "compare").mockResolvedValueOnce(true);
      issueToken.mockResolvedValueOnce("token");
      const response = await AdminService.login(loginCreds);
      expect(response).toBeDefined();
      expect(typeof response).toBe("string");
    });
  });

  describe("getProfile()", () => {
    it(`should return profile`, async () => {
      Admins.findOne.mockResolvedValueOnce({ id: 2 });
      const response = await AdminService.getProfile({ id: 2 });
      expect(response).toBeDefined();
      expect(response).toEqual({ id: 2 });
    });
  });

  describe("verifyToken()", () => {
    it(`should return error while verifying the token`, async () => {
      try {
        validatePasswordToken.mockResolvedValueOnce(null);
        await AdminService.verifyToken({ token: "asd" });
      } catch (error) {
        expect(error.message).toBeDefined();
        expect(error.message).toEqual(ERROR_CODES.TOKEN_FAILED.message);
      }
    });

    it(`should return error 404 while verifying the token`, async () => {
      try {
        validatePasswordToken.mockResolvedValueOnce(404);
        await AdminService.verifyToken({ token: "asd" });
      } catch (error) {
        expect(error.message).toBeDefined();
        expect(error.message).toEqual(ERROR_CODES.TOKEN_FAILED.message);
      }
    });

    it(`should fail the token`, async () => {
      try {
        validatePasswordToken.mockResolvedValueOnce(true);
        ResetPasswordTokens.findOne.mockResolvedValueOnce(null);
        await AdminService.verifyToken({ token: "asd" });
      } catch (error) {
        expect(error.message).toBeDefined();
        expect(error.message).toEqual(ERROR_CODES.TOKEN_FAILED.message);
      }
    });

    it(`should verify the token`, async () => {
      validatePasswordToken.mockResolvedValueOnce(true);
      ResetPasswordTokens.findOne.mockResolvedValueOnce(true);
      const response = await AdminService.verifyToken({ token: "asd" });
      expect(response).toBeDefined();
      expect(response).toEqual(true);
    });
  });

  describe("updatePassword()", () => {
    it(`should return error ${ERROR_CODES.INVALID_PASSWORD.message}`, async () => {
      try {
        Admins.findOne.mockResolvedValueOnce(null);
        await AdminService.updatePassword({
          loggedUser: { id: 2 },
          password: "Mehmood@Curriki1",
          newPassword: "Mehmood@Curriki3",
        });
      } catch (error) {
        expect(error.message).toBeDefined();
        expect(error.message).toEqual(ERROR_CODES.INVALID_PASSWORD.message);
      }
    });

    it(`should return error ${ERROR_CODES.INVALID_PASSWORD.message}`, async () => {
      try {
        Admins.findOne.mockResolvedValueOnce({ password: "123" });
        jest.spyOn(bcrypt, "compare").mockResolvedValueOnce(false);
        await AdminService.updatePassword({
          loggedUser: { id: 2 },
          password: "Mehmood@Curriki1",
          newPassword: "Mehmood@Curriki3",
        });
      } catch (error) {
        expect(error.message).toBeDefined();
        expect(error.message).toEqual(ERROR_CODES.INVALID_PASSWORD.message);
      }
    });

    it(`should return error ${ERROR_CODES.CANNOT_USE_OLD_PASSWORD.message}`, async () => {
      try {
        Admins.findOne.mockResolvedValueOnce({ password: "123" });
        jest.spyOn(bcrypt, "compare").mockResolvedValueOnce(true);
        await AdminService.updatePassword({
          loggedUser: { id: 2 },
          password: "Mehmood@Curriki1",
          newPassword: "Mehmood@Curriki1",
        });
      } catch (error) {
        expect(error.message).toBeDefined();
        expect(error.message).toEqual(
          ERROR_CODES.CANNOT_USE_OLD_PASSWORD.message
        );
      }
    });

    it(`should update admin password`, async () => {
      Admins.findOne.mockResolvedValueOnce({ password: "asd" });
      jest.spyOn(bcrypt, "compare").mockResolvedValueOnce(true);
      Admins.update.mockResolvedValueOnce(true);
      const response = await AdminService.updatePassword({
        loggedUser: { id: 2 },
        password: "Mehmood@Curriki1",
        newPassword: "Mehmood@Curriki3",
      });
      expect(response).toBeDefined();
      expect(response).toEqual(true);
    });
  });

  describe("forgetPassword()", () => {
    it(`should return true`, async () => {
      Admins.findOne.mockResolvedValueOnce(null);
      const response = await AdminService.forgetPassword({
        email: "Mehmood@Curriki.com",
      });
      expect(response).toBeDefined();
      expect(response).toEqual(true);
    });

    it(`should return true`, async () => {
      Admins.findOne.mockResolvedValueOnce({
        id: 1,
        email: "mehmoodce@gmail.com",
      });
      issueResetPassToken.mockResolvedValueOnce("token");
      ResetPasswordTokens.findOne.mockResolvedValueOnce(null);
      ResetPasswordTokens.create.mockResolvedValueOnce(true);
      jest.spyOn(EmailService, "sendEmail").mockResolvedValueOnce(true);
      const response = await AdminService.forgetPassword({
        email: "mehmoodce@gmail.com",
      });
      expect(response).toBeDefined();
      expect(response).toEqual(true);
    });

    it(`should return true`, async () => {
      Admins.findOne.mockResolvedValueOnce({
        id: 1,
        email: "mehmoodce@gmail.com",
      });
      issueResetPassToken.mockResolvedValueOnce("token");
      ResetPasswordTokens.findOne.mockResolvedValueOnce({ id: 1 });
      ResetPasswordTokens.update.mockResolvedValueOnce(true);
      jest.spyOn(EmailService, "sendEmail").mockResolvedValueOnce(true);
      const response = await AdminService.forgetPassword({
        email: "mehmoodce@gmail.com",
      });
      expect(response).toBeDefined();
      expect(response).toEqual(true);
    });
  });

  describe("resetPassword()", () => {
    it(`should return error ${ERROR_CODES.RESET_PASS_LINK_EXPIRED.message}`, async () => {
      try {
        ResetPasswordTokens.findOne.mockResolvedValueOnce(null);
        await AdminService.resetPassword({
          password: "Mehmood@Curriki1",
          token: "token",
        });
      } catch (error) {
        expect(error.message).toBeDefined();
        expect(error.message).toEqual(ERROR_CODES.RESET_PASS_LINK_EXPIRED.message);
      }
    });

    it(`should return error ${ERROR_CODES.RESET_PASS_LINK_EXPIRED.message}`, async () => {
      try {
        ResetPasswordTokens.findOne.mockResolvedValueOnce(true);
        validatePasswordToken.mockResolvedValueOnce(404);
        await AdminService.resetPassword({
          password: "Mehmood@Curriki1",
          token: "token",
        });
      } catch (error) {
        expect(error.message).toBeDefined();
        expect(error.message).toEqual(ERROR_CODES.RESET_PASS_LINK_EXPIRED.message);
      }
    });

    it(`should return error ${ERROR_CODES.RESET_PASS_LINK_EXPIRED.message}`, async () => {
      try {
        ResetPasswordTokens.findOne.mockResolvedValueOnce(true);
        validatePasswordToken.mockResolvedValueOnce({email: "mehmoodce@gmail.com"});
        Admins.findOne.mockResolvedValueOnce(null);
        await AdminService.resetPassword({
          password: "Mehmood@Curriki1",
          token: "token",
        });
      } catch (error) {
        expect(error.message).toBeDefined();
        expect(error.message).toEqual(ERROR_CODES.RESET_PASS_LINK_EXPIRED.message);
      }
    });

    it(`should return error ${ERROR_CODES.RESET_PASS_LINK_EXPIRED.message}`, async () => {
        ResetPasswordTokens.findOne.mockResolvedValueOnce(true);
        validatePasswordToken.mockResolvedValueOnce({email: "mehmoodce@gmail.com"});
        Admins.findOne.mockResolvedValueOnce(true);
        ResetPasswordTokens.destroy.mockResolvedValueOnce(true);
        Admins.update.mockResolvedValueOnce(true);
        const response = await AdminService.resetPassword({
          password: "Mehmood@Curriki1",
          token: "token",
        });
        expect(response).toBeDefined();
        expect(response).toEqual(true);
    });

  });
});
