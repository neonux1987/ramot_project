const CustomError = require('./CustomError');

class ServiceError extends CustomError {

  constructor(...args) {
    super(...args);
    this.name = "service_error";
    Error.captureStackTrace(this, ServiceError);
  }

}

module.exports = ServiceError;