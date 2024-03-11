const Joi = require('joi');

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
  subid: Joi.string().max(10000).allow(""),
});

module.exports.xapi = Joi.object({
  id: Joi.string().max(10000).allow(""),
  verb: Joi.object(),
});
