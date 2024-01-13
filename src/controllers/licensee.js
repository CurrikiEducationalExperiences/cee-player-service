const { LicenseeService } = require("../services/licensee");
const { responseHandler } = require("../utils/response");
class LicenseeController {
  static async addLicensee(req, res, next) {
    try {
      const result = await LicenseeService.addLicensee(req.body);
      return responseHandler({
        response: res,
        result,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getLicensees(req, res, next) {
    try {
      const result = await LicenseeService.getLicensees(req.body);
      return responseHandler({
        response: res,
        result,
      });
    } catch (error) {
      next(error);
    }
  }

  static async updateLicensee(req, res, next) {
    try {
      req.body.licenseeId = req.query.id
      const result = await LicenseeService.updateLicensee(req.body);
      return responseHandler({
        response: res,
        result,
      });
    } catch (error) {
      next(error);
    }
  }

  static async deleteLicensee(req, res, next) {
    try {
      const result = await LicenseeService.deleteLicensee({id: req.query.id});
      return responseHandler({
        response: res,
        result,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = { LicenseeController };
