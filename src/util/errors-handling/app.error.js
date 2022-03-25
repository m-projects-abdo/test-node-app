class AppErrors extends Error {
  ERROR_LIST;
  STATUS_CODE;

  constructor(message, statusCode = 404) {
    super(message);
    this.ERROR_LIST = message;
    this.STATUS_CODE = statusCode;
  }

  get errors() {
    return this.ERROR_LIST;
  }

  get statusCode() {
    return this.STATUS_CODE;
  }
}

module.exports = AppErrors;