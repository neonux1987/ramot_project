const winston = require('winston');
const path = require('path');

class LogManager {

  createErrorLog() {
    this.logger = winston.createLogger({
      format: winston.format.json(),
      transports: [
        //
        // - Write all logs error (and below) to `error.log`.
        //
        new winston.transports.File({
          filename: "./ramot-mezach-error-log.txt",
          level: 'error',
          colorize: false,
          timestamp: true,
          maxsize: 50 * 1024,
          maxFiles: 1,
          prettyPrint: true
        })
      ]
    });

  }

  getLogger() {
    return this.logger;
  }

}

module.exports = new LogManager();