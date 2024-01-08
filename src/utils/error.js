class CustomError extends Error {
  constructor({
    message = 'API server error', code = 400,
  }) {
    super(message);
    this.message = message;
    this.code = code;
  }
}

module.exports = CustomError;
