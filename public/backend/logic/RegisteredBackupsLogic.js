const fse = require('fs-extra');
const ConfigurationLogic = require('./ConfigurationLogic');

const CONFIG_BACKUPS_NAMES = ConfigurationLogic.paths.backups_names_path;

class RegisteredBackupsLogic {

  getRegisteredBackups() {
    return fse.readJSON(CONFIG_BACKUPS_NAMES);
  }

  updateRegisteredBackups(data) {
    return fse.writeJSON(CONFIG_BACKUPS_NAMES, data, {
      spaces: 2
    });
  }

  initializeBackupsList() {
    return this.updateRegisteredBackups([]);
  }

}

module.exports = RegisteredBackupsLogic;