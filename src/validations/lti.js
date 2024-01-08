const Joi = require('joi');

module.exports.registerPlatform = Joi.object({
  url: Joi.string().max(500).required(),
  name: Joi.string().max(500).required(),
  clientId: Joi.string().max(500).required(),
  authenticationEndpoint: Joi.string().max(1000).required(),
  accesstokenEndpoint: Joi.string().max(1000).required(),
  authConfigMethod: Joi.string().max(500).required(),
  authConfigKey: Joi.string().max(500).required(),
  secret: Joi.string().max(500).required(),
});

module.exports.grade = Joi.object({
  grade: Joi.number().min(0).max(100000000),
});

module.exports.play = Joi.object({
  c2eId: Joi.string().max(100000000).allow(""),
});

module.exports.deeplink = Joi.object({
  title: Joi.string().max(10000).allow(""),
  name: Joi.string().max(10000).allow(""),
  value: Joi.string().max(10000).allow(""),
  id: Joi.string().max(10000).allow(""),
});

module.exports.resources = Joi.object({
  page: Joi.number().min(1).max(10000),
  limit: Joi.number().min(1).max(10000),
  query: Joi.string().max(10000).allow(""),
});

module.exports.stream = Joi.object({
  ceeId: Joi.string().max(10000).allow(""),
});

module.exports.xapi = Joi.object({
  id: Joi.string().max(10000).allow(""),
  verb: Joi.object(),
});
