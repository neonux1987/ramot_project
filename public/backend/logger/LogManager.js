const simpleNodeLogger = require('simple-node-logger');

class LogManager {

  createErrorLog() {
    this.logger = winston.createLogger({
      level: 'info',
      format: winston.format.json(),
      defaultMeta: { service: 'user-service' },
      transports: [
        //
        // - Write to all logs with level `info` and below to `combined.log` 
        // - Write all logs error (and below) to `error.log`.
        //
        new winston.transports.File({ filename: 'c:\\ramot-mezach-error-log.txt', level: 'error' })
      ]
    });

  }

  getLogger() {
    return this.log;
  }

}

module.exports = new LogManager();