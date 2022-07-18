const CustomError = require("./CustomError");

class LogicError extends CustomError {
  constructor(...args) {
    super(...args);
  }
}

module.exports = LogicError;
