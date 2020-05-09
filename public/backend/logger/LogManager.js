const log4js = require('log4js');

class LogManager {

  constructor() {
    // will add the ability to log in json format
    log4js.addLayout('json', (config) => {
      return function (logEvent) { return JSON.stringify(logEvent, null, 2) + config.separator; }
    });

    log4js.configure({
      appenders: {
        Application: {
          type: 'file',
          filename: './logs/ramot-mezach-errors.log',
          layout: { type: 'json', separator: ',' },
          maxLogSize: 1048576
        }
      },
      categories: { default: { appenders: ['Application'], level: 'error' } }
    });

  }

  getLogger() {
    return log4js.getLogger('Application');
  }

}

module.exports = new LogManager();