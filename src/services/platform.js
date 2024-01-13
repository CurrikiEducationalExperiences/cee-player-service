const { Platforms } = require("../../models/platforms");
const { PublicKeys } = require("../../models/publicKeys");
const { PrivateKeys } = require("../../models/privateKeys");
const lti = require("ltijs").Provider;

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
    let platformData = await Platforms.findAll({ raw: true });
    let platforms = [];
    await Promise.all(
      platformData.map(async (data) => {
        const createdAt = data.createdAt;
        const updatedAt = data.updatedAt;
        let platform = {};
        const publicKeys = await PublicKeys.findOne({
          where: { clientId: data.clientId },
          attributes: {
            exclude: [
              "kid",
              "clientId",
              "platformUrl",
              "createdAt",
              "updatedAt",
            ],
          },
          raw: true,
        });
        platformData.publicKeys = publicKeys;
        const privateKeys = await PrivateKeys.findOne({
          where: { clientId: data.clientId },
          attributes: {
            exclude: [
              "kid",
              "clientId",
              "platformUrl",
              "createdAt",
              "updatedAt",
            ],
          },
          raw: true,
        });
        delete data.createdAt
        delete data.updatedAt
        platform = data;
        platform.publicKeys = publicKeys;
        platform.privateKeys = privateKeys;
        platform.createdAt = createdAt
        platform.updatedAt = updatedAt
        platforms.push(platform);
      })
    );
    return platforms;
  }

  static async deletePlatform(params) {
    const id = params.id;
    await lti.deletePlatformById(id);
    return true;
  }
}
module.exports = { PlatformService };
