const LogManager = require("../logger/LogManager");

class CustomError extends Error {
  constructor(message, fileName, originalError) {
    super(message);
    this.fileName = fileName;
    this.originalError = originalError;

    const logger = LogManager.getLogger();
    logger.error(this.toString());
  }

  toString() {
    const error = {};
    error.name = this.name;
    error.fileName = this.fileName;
    error.message = this.message;
    error.stack = this.stack;
    if (this.originalError) {
      error.originalError = {
        message: this.originalError.message,
        stack: this.originalError.stack
      };
    }

    return error;
  }
}

module.exports = CustomError;
