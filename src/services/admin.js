const bcrypt = require("bcrypt");
const passCom = require("joi-password-complexity");
const ERROR_CODES = require("../constant/error-messages");
const CustomError = require("../utils/error");
const { Admins } = require("../../models/admins");
const { ResetPasswordTokens } = require("../../models/resetPasswordTokens");
const { EmailService } = require("../utils/email");
const CONST_VARS = require("../constant/constant")
const {
  issueToken,
  issueResetPassToken,
  validatePasswordToken,
} = require("../middleware/auth");
const _complexityOptions = {
  min: 8,
  max: 26,
  lowerCase: 1,
  upperCase: 1,
  numeric: 1,
  symbol: 1,
};

class AdminService {
  static async register(params) {
    const _existingProfile = await Admins.findOne({
      where: { email: params.email },
      raw: true,
    });
    if (_existingProfile) {
      throw new CustomError(ERROR_CODES.USER_ALREADY_EXISTS);
    }
    const _pass = passCom(_complexityOptions).validate(params.password); // password validation
    if (_pass.error) {
      throw new CustomError(ERROR_CODES.PASS_RULES_ERROR);
    }
    await Admins.create({
      email: params.email,
      password: bcrypt.hashSync(params.password, bcrypt.genSaltSync(2)),
    });
    return true;
  }

  static async login(params) {
    const _profile = await Admins.findOne({
      where: { email: params.email },
      raw: true,
    });
    if (!_profile) {
      throw new CustomError(ERROR_CODES.INVALID_EMAIL_PASSWORD);
    }
    if (!(await bcrypt.compare(params.password, _profile.password))) {
      throw new CustomError(ERROR_CODES.INVALID_EMAIL_PASSWORD);
    }
    const _token = issueToken({ id: _profile.id, email: _profile.email });
    return _token;
  }

  static async getProfile(params) {
    const _user = await Admins.findOne({
      where: { id: params.id },
      attributes: { exclude: ["password"] },
      raw: true,
    });
    return _user;
  }

  static async verifyToken(params) {
    const _decodedToken = validatePasswordToken(params.token);
    if (!_decodedToken) throw new CustomError(ERROR_CODES.TOKEN_FAILED);
    if (_decodedToken === 404) throw new CustomError(ERROR_CODES.TOKEN_FAILED);
    const _tokenCheck = await ResetPasswordTokens.findOne({
      where: { token: params.token },
      raw: true,
    });
    if (!_tokenCheck) {
      throw new CustomError(ERROR_CODES.TOKEN_FAILED);
    }
    return true;
  }

  static async updatePassword(params) {
    const _profile = await Admins.findOne({
      where: { id: params.loggedUser.id },
      raw: true,
    });
    if (!_profile) {
      throw new CustomError(ERROR_CODES.INVALID_PASSWORD);
    }
    if (!(await bcrypt.compare(params.password, _profile.password))) {
      throw new CustomError(ERROR_CODES.INVALID_PASSWORD);
    }
    if (params.password === params.newPassword) {
      throw new CustomError(ERROR_CODES.CANNOT_USE_OLD_PASSWORD);
    }
    const _pass = passCom(_complexityOptions).validate(params.newPassword); // password validation
    if (_pass.error) {
      throw new CustomError(ERROR_CODES.PASS_RULES_ERROR);
    }
    await Admins.update(
      {
        password: bcrypt.hashSync(params.newPassword, bcrypt.genSaltSync(2)),
      },
      {
        where: {
          id: params.loggedUser.id,
        },
      }
    );
    return true;
  }

  static async forgetPassword(params) {
    const _profile = await Admins.findOne({
      where: { email: params.email },
      raw: true,
    });
    if (!_profile) {
      return true;
    }
    const _token = issueResetPassToken({
      id: _profile.id,
      email: _profile.email,
    });
    const _tokenCheck = await ResetPasswordTokens.findOne({
      where: { email: params.email },
      raw: true,
    });
    if (!_tokenCheck) {
      await ResetPasswordTokens.create({
        email: params.email,
        token: _token,
      });
    } else {
      await ResetPasswordTokens.update(
        {
          token: _token,
        },
        {
          where: {
            id: _tokenCheck.id,
          },
        }
      );
    }
    const response = await EmailService.sendEmail({
      email: params.email,
      subject: CONST_VARS.CONSTANTS.FORGET_EMAIL_SUBJECT,
      body: CONST_VARS.CONSTANTS.FORGET_EMAIL_BODY+_token,
    });
    if (response === "ok") return true;
    else return response;
  }

  static async resetPassword(params) {
    const _pass = passCom(_complexityOptions).validate(params.password); // password validation
    if (_pass.error) {
      throw new CustomError(ERROR_CODES.PASS_RULES_ERROR);
    }
    const _tokenCheck = await ResetPasswordTokens.findOne({
      where: { token: params.token },
      raw: true,
    });
    if (!_tokenCheck) {
      throw new CustomError(ERROR_CODES.RESET_PASS_LINK_EXPIRED);
    }
    // verify the token
    const _decodedToken = validatePasswordToken(params.token);
    if (_decodedToken === 404)
      throw new CustomError(ERROR_CODES.RESET_PASS_LINK_EXPIRED);
    const _profile = await Admins.findOne({
      where: { email: _decodedToken.email },
      raw: true,
    });
    if (!_profile) {
      throw new CustomError(ERROR_CODES.RESET_PASS_LINK_EXPIRED);
    }
    await ResetPasswordTokens.destroy({
      where: {
        email: _decodedToken.email,
      },
    });
    await Admins.update(
      {
        password: bcrypt.hashSync(params.password, bcrypt.genSaltSync(2)),
      },
      {
        where: {
          email: _decodedToken.email,
        },
      }
    );
    return true;
  }
}
module.exports = { AdminService };
