const log = require('electron-log');
const SystemPaths = require("../system/SystemPaths");

class LogManager {

  constructor() {
    log.transports.file.resolvePath = () => SystemPaths.paths.log_file_path;
    log.transports.console.level = false;
    log.transports.file.maxSize = 1048576;
  }

  getLogger() {
    return log;
  }

}

module.exports = new LogManager();