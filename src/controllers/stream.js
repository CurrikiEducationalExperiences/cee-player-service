const axios = require('axios');
const { responseHandler } = require("../utils/response");
const { PlatformSettings } = require("../../models/platformSettings");
class StreamController {

  // Request streaming session token from the store service
  static async getToken(req, res, next) {
    // Platform settings will be determined by the lti session, hardcoded for now
    const settings = await PlatformSettings.findOne({where: {lti_client_id: res.locals.token.clientId}});
    const subId = req.query.subid;
    
    try {
      const options = {
        method: 'GET', // Adjust the HTTP method as needed (GET, POST, etc.)
        url: `${settings.cee_provider_url}/api/v1/stream/token?subid=${subId}`,
        headers: {
          'X-API-KEY': settings.cee_secret_key,
          'Content-Type': 'application/json',
        },
      };
      const response = await axios(options);

      return responseHandler({
        response: res,
        result: response.data.result
      });
    } catch (error) {
      console.log('getToken Error fetching token from store');
      next(error);
    }
  }

  // Gets manifest from the store service
  static async getManifest(req, res, next) {
    const subId = req.query.subid;
    const settings = await PlatformSettings.findOne({where: {lti_client_id: res.locals.token.clientId}});
    try {
      const options = {
        method: 'GET', // Adjust the HTTP method as needed (GET, POST, etc.)
        url: `${settings.cee_provider_url}/api/v1/stream/manifest?subid=${subId}`,
        headers: {
          'X-API-KEY': settings.cee_secret_key,
          'Content-Type': 'application/json',
        },
      };
      const response = await axios(options);

      return responseHandler({
        response: res,
        result: response.data.result
      });
    } catch (error) {
      if (error.response.data) return res.status(error.response.data.code).json(error.response.data);

      next(error);
    }
  }

  // Gets manifest from the store service
  static async search(req, res, next) {
    const query = req.query.query;
    const settings = await PlatformSettings.findOne({where: {lti_client_id: res.locals.token.clientId}});
    try {
      const options = {
        method: 'GET', // Adjust the HTTP method as needed (GET, POST, etc.)
        url: `${settings.cee_provider_url}/api/v1/c2e-subscriptions/manifest?query=${query}`,
        headers: {
          'X-API-KEY': settings.cee_secret_key,
          'Content-Type': 'application/json',
        },
      };
      const response = await axios(options);

      return responseHandler({
        response: res,
        result: response.data.result
      });
    } catch (error) {
      if (error.response.data) return res.status(error.response.data.code).json(error.response.data);

      next(error);
    }
  }
}

module.exports = { StreamController };
