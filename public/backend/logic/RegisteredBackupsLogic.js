const fse = require('fs-extra');
const SystemPaths = require('../system/SystemPaths');

const CONFIG_BACKUPS_NAMES = SystemPaths.paths.backups_names_file_path;

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