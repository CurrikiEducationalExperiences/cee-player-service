const { ltiService } = require("../service/lti");
class ltiController {
  static async grade(req, res) {
    await ltiService.grade(req, res);
  }

  static async members(req, res) {
    await ltiService.members(req, res);
  }

  static async deeplink(req, res) {
    await ltiService.deeplink(req, res);
  }

  static async info(req, res) {
    await ltiService.info(req, res);
  }

  static async resources(req, res) {
    await ltiService.resources(req, res);
  }

  static async stream(req, res) {
    await ltiService.stream(req, res);
  }

  static async xapi(req, res) {
    await ltiService.xapi(req, res);
  }

  static async registerPlatform(req, res) {
    await ltiService.registerPlatform(req, res);
  }

  static async canvasConfigJson(req, res) {
    await ltiService.canvasConfigJson(req, res);
  }
}

module.exports = { ltiController };
