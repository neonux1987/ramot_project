const CustomError = require('./CustomError');

class DbError extends CustomError {

  constructor(...args) {
    super(...args);
    this.name = "database_error";
    Error.captureStackTrace(this, DbError);
  }

}

module.exports = DbError;