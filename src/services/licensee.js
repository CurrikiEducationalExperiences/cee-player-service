const { PlatformSettings } = require("../../models/platformSettings");
const { Platforms } = require("../../models/platforms");

class LicenseeService {
  static async addLicensee(params) {
    await PlatformSettings.create(params)
    return true
  }

  static async getLicensees() {
    let licenseeData = await PlatformSettings.findAll({ raw: true });
    let licesees = [];
    await Promise.all(
      licenseeData.map(async (data) => {
        const createdAt = data.createdAt;
        const updatedAt = data.updatedAt;
        let licensee = {};
        const platform = await Platforms.findOne({
          where: { clientId: data.lti_client_id },
          attributes: {
            exclude: [
              "accesstokenEndpoint",
              "authEndpoint",
              "platformUrl",
              "createdAt",
              "updatedAt",
              "kid",
              "authConfig",
              "authorizationServer"
            ],
          },
          raw: true,
        });
        delete data.createdAt
        delete data.updatedAt
        licensee = data;
        platform ? licensee.platformName = platform.platformName : null
        licensee.createdAt = createdAt
        licensee.updatedAt = updatedAt
        licesees.push(licensee);
      })
    );
    return licesees
  }

  static async updateLicensee(params) {
    const id = params.licenseeId
    delete params.licenseeId
    await PlatformSettings.update(
      params,
      {
        where: {
          id,
        },
      }
    );
    return true
  }

  static async deleteLicensee(params) {
    await PlatformSettings.destroy({
      where: {
        id: params.id,
      },
    });
    return true
  }
}
module.exports = { LicenseeService };
