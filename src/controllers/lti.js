const { LtiService } = require("../services/lti");
class LtiController {
  static async grade(req, res) {
    await LtiService.grade(req, res);
  }

  static async members(req, res) {
    await LtiService.members(req, res);
  }

  static async deeplink(req, res) {
    await LtiService.deeplink(req, res);
  }

  static async info(req, res) {
    await LtiService.info(req, res);
  }

  static async resources(req, res) {
    await LtiService.resources(req, res);
  }

  static async stream(req, res) {
    await LtiService.stream(req, res);
  }

  static async xapi(req, res) {
    await LtiService.xapi(req, res);
  }

  static async registerPlatform(req, res) {
    await LtiService.registerPlatform(req, res);
  }

  static async canvasConfigJson(req, res) {
    await LtiService.canvasConfigJson(req, res);
  }
}

module.exports = { LtiController };
