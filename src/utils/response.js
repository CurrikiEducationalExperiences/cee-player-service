const CustomError = require('./error');

const responseHandler = (data) => {
  const {
    response, message = 'success', result, code = 200,
  } = data;
  return response.status(code).json({
    code,
    message,
    result,
  });
};

const requestHelper = (request) => {
  if (request.body) {
    if (request.body.password) {
      delete request.body.password;
    }
    return request.body;
  }
  return 'noBody';
};

// eslint-disable-next-line no-unused-vars
const globalErrorHandler = (err, request, response, next) => {
  const originalError = err;
  if (!(err instanceof CustomError)) {
    if (err instanceof Error) {
      err = new CustomError({
        message: err.message,
      });
    }
  }
  const userId = !request.loggedUser ? 0 : request.loggedUser.id;
  if(request?.body?.user) delete request?.body?.user;
  console.error('error', `URL: ${request.url} - ID:${userId} `, { meta: { error: originalError.stack, body: requestHelper(request) } });
  return responseHandler({
    response,
    message: err.message,
    result: null,
    code: err.code || 500,
    errors: [err],
    isSuccess: false,
  });
};

module.exports = {
  responseHandler,
  globalErrorHandler,
};
