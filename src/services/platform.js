const ERROR_CODES = require("../constant/error-messages");
const CustomError = require("../utils/error");
const { Admins } = require("../../models/admins");
const CONST_VARS = require("../constant/constant");

class PlatformService {
  static async registerPlatform(params) {
    await lti.registerPlatform({
      url: params.url,
      name: params.name,
      clientId: params.clientId,
      authenticationEndpoint: params.authenticationEndpoint,
      accesstokenEndpoint: params.accesstokenEndpoint,
      authConfig: {
        method: params.authConfigMethod,
        key: params.authConfigKey,
      },
    });
    return true;
  }

  static async getPlatforms() {
    const platforms = await lti.getAllPlatforms();
    return platforms;
  }

  static async deletePlatform(params) {
    const id = params.id;
    await lti.deletePlatformById(id); // Deletes a platform
    return true;
  }
}
module.exports = { PlatformService };
