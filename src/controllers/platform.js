const { PlatformService } = require("../services/platform");
const { responseHandler } = require("../utils/response");
class PlatformController {
  static async registerPlatform(req, res, next) {
    try {
      const result = await PlatformService.registerPlatform(req.body);
      return responseHandler({
        response: res,
        result,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getPlatform(req, res, next) {
    try {
      const result = await PlatformService.getPlatforms();
      return responseHandler({
        response: res,
        result,
      });
    } catch (error) {
      next(error);
    }
  }

  static async deletePlatform(req, res, next) {
    try {
      const result = await PlatformService.deletePlatform({id: req.query.platformId});
      return responseHandler({
        response: res,
        result,
      });
    } catch (error) {
      next(error);
    }
  }

}

module.exports = { PlatformController };
