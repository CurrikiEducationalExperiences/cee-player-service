const axios = require('axios');
const TinCan = require('tincanjs');
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


  static async sendXAPI(req, res, next) {
    const settings = await PlatformSettings.findOne({where: {lti_client_id: res.locals.token.clientId}});
    var statement = new TinCan.Statement(req.body.statement);
    var lrs;
    try {
      lrs = new TinCan.LRS(
        {
          endpoint: settings.lrs_url,
          username: settings.lrs_username,
          password: settings.lrs_password,
          allowFail: false,
        }
      );
    } catch (ex) {
      console.log("Failed to setup LRS object: ", ex);
      next(ex);
    }

    try {
      lrs.saveStatement(
        statement,
        {
          callback: function (err, xhr) {
            if (err !== null) {
                if (xhr !== null) {
                  console.log("Failed to save statement: " + xhr.responseText + " (" + xhr.status + ")");
                  return res.status(500).json('Failed to save statement');
                }
  
                console.log("Failed to save statement: " + err);
                return res.status(500).json('Failed to save statement');
            }
  
            console.log("Statement saved");
            return res.status(200).json('Statement saved');
          }
        }
      );
    } catch (e) {
      console.log('Error saving statement: ', e);
      return res.status(500).json('Failed to save statement');
    }
  }
}

module.exports = { StreamController };
