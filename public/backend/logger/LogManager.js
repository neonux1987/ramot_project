const {
  createLogger,
  transports,
  format
} = require('winston');
const path = require('path');

class LogManager {

  constructor() {
    this.logger = createLogger({
      transports: [
        //
        // - Write all logs error (and below) to `error.log`.
        //
        new transports.File({
          filename: "c:\\ramot-mezach-error-log.txt",
          level: 'error',
          format: format.combine(format.timestamp(), format.json()),
          prettyPrint: true,
          options: { flags: 'w' }
        })
      ]
    });

  }

  getLogger() {
    return this.logger;
  }

}

module.exports = new LogManager();