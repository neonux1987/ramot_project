const { app, BrowserWindow } = require('electron');
const FileType = require('file-type');
const fse = require('fs-extra');
const LogicError = require('../customErrors/LogicError');
const connectionPool = require('../connection/ConnectionPool');
const ServicesLogic = require('../logic/ServicesLogic');
const SettingsLogic = require('../logic/SettingsLogic');

const EXT = "sqlite";

class RestoreDbLogic {

  constructor() {
    this.servicesLogic = new ServicesLogic();
    this.settingsLogic = new SettingsLogic();
  }

  async restoreFromFile(path) {
    const fileType = await FileType.fromFile(path);
    if (fileType === undefined || fileType.ext !== EXT)
      throw new LogicError(`הקובץ שבחרת הוא לא קובץ בסיס נתונים מסוג ${EXT}`);

    const currentWindow = BrowserWindow.getFocusedWindow();
    //currentWindow.hide();

    await this.servicesLogic.stopAllServices();
    await connectionPool.destroy();

    //const sqlite3File = await fse.readFile(path);

    const locations = await this.settingsLogic.getLocationsSettings();

    // replace the old database 
    await fse.copy(path, locations.db_file_path);

    await connectionPool.createConnection();

    await this.servicesLogic.startAllServices();

    currentWindow.reload();

    currentWindow.show();

  }

}

module.exports = RestoreDbLogic;