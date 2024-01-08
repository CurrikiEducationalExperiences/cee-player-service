const validationMiddleware = (validationObject, isGet = false) => (req, res, next) => {
  const body = isGet ? req.query : req.body;
  const { error } = validationObject.validate(body);
  if (error) {
    let errMessage = error.details[0].message ? error.details[0].message : error.message;
    errMessage = errMessage.replace(/[[\]""]+/g, '');
    return res
      .status(400)
      .send({ code: 400, message: errMessage, result: null });
  }
  return next();
};

module.exports = validationMiddleware;
