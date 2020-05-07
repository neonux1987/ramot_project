const CustomError = require('./CustomError');

class LogicError extends CustomError {

  constructor(...args) {
    super(...args);
    this.name = "database_error";
    Error.captureStackTrace(this, LogicError);
  }

}

module.exports = LogicError;