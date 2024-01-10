const { AdminService } = require("../services/admin");
const { responseHandler } = require("../utils/response");
class AdminController {
  static async register(req, res, next) {
    try {
      const result = await AdminService.register(req.body);
      return responseHandler({
        response: res,
        result,
      });
    } catch (error) {
      next(error);
    }
  }
  
  static async login(req, res, next) {
    try {
      const result = await AdminService.login(req.body);
      return responseHandler({
        response: res,
        result,
      });
    } catch (error) {
      next(error);
    }
  }
  
  static async getProfile(req, res, next) {
    try {
      const result = await AdminService.getProfile(req.loggedUser);
      return responseHandler({
        response: res,
        result,
      });
    } catch (error) {
      next(error);
    }
  }

  static async verifyToken(req, res, next) {
    try {
      const result = await AdminService.verifyToken({token: req.query.token});
      return responseHandler({
        response: res,
        result,
      });
    } catch (error) {
      next(error);
    }
  }

  static async updatePassword(req, res, next) {
    try {
      req.body.loggedUser = req.loggedUser;
      const result = await AdminService.updatePassword(req.body);
      return responseHandler({
        response: res,
        result,
      });
    } catch (error) {
      next(error);
    }
  }

  static async forgetPassword(req, res, next) {
    try {
      req.body.loggedUser = req.loggedUser;
      const result = await AdminService.forgetPassword(req.body);
      return responseHandler({
        response: res,
        result,
      });
    } catch (error) {
      next(error);
    }
  }

  static async resetPassword(req, res, next) {
    try {
      req.body.loggedUser = req.loggedUser;
      const result = await AdminService.resetPassword(req.body);
      return responseHandler({
        response: res,
        result,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = { AdminController };
