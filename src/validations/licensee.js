const Joi = require('joi');

module.exports.addLicensee = Joi.object({
  url: Joi.string().max(500).required(),
  name: Joi.string().max(500).required(),
  clientId: Joi.string().max(500).required(),
  authenticationEndpoint: Joi.string().max(1000).required(),
  accesstokenEndpoint: Joi.string().max(1000).required(),
  authConfigMethod: Joi.string().max(500).required(),
  authConfigKey: Joi.string().max(500).required(),
});

module.exports.updateLicensee = Joi.object({
  url: Joi.string().max(500).required(),
  name: Joi.string().max(500).required(),
  clientId: Joi.string().max(500).required(),
  authenticationEndpoint: Joi.string().max(1000).required(),
  accesstokenEndpoint: Joi.string().max(1000).required(),
  authConfigMethod: Joi.string().max(500).required(),
  authConfigKey: Joi.string().max(500).required(),
});

module.exports.deleteLicensee = Joi.object({
  id: Joi.string().min(1).max(100),
});
