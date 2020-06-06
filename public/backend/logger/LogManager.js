const log4js = require('log4js');
const path = require('path');
const SystemPaths = require("../system/SystemPaths");

class LogManager {

  constructor() {
    // will add the ability to log in json format
    /* log4js.addLayout('json', (config) => {
      return function (logEvent) { return JSON.stringify(logEvent, null, 2) + config.separator; }
    }); */

    log4js.configure({
      appenders: {
        Application: {
          type: 'file',
          filename: SystemPaths.paths.log_file_path,
          //layout: { type: 'json', separator: ',' },
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