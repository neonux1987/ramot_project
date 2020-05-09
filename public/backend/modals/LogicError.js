const CustomError = require('./CustomError');

class LogicError extends CustomError {

  constructor(...args) {
    super(...args);
    this.name = "logic_error";
    Error.captureStackTrace(this, LogicError);
  }

}

module.exports = LogicError;