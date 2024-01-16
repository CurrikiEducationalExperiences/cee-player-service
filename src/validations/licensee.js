const Joi = require('joi');

module.exports.addLicensee = Joi.object({
  lti_client_id: Joi.string().max(500).required(),
  cee_licensee_id: Joi.string().max(500).required(),
  cee_provider_url: Joi.string().max(500).required(),
  cee_secret_key: Joi.string().max(500).required(),
});

module.exports.updateLicensee = Joi.object({
  lti_client_id: Joi.string().max(500).required(),
  cee_licensee_id: Joi.string().max(500).required(),
  cee_provider_url: Joi.string().max(500).required(),
  cee_secret_key: Joi.string().max(500).required(),
});

module.exports.deleteLicensee = Joi.object({
  id: Joi.string().min(1).max(100),
});
