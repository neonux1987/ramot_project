const { app, dialog } = require('electron');

const isDev = require('electron-is-dev');
const os = require('os');
const platform = os.platform();
const homedir = os.homedir();
const path = require('path');
const { getDocumentsFolder, getDataHome } = require('platform-folders');
const fse = require('fs-extra');

const usersAppDataFolder = getDataHome();

// configuration files paths
const NDTS_FOLDER_PATH = platform === "linux" ? path.join(usersAppDataFolder, "Dropbox/ndts") : path.join(usersAppDataFolder, "ndts");
const CONFIG_FOLDER_PATH = platform === "linux" ? path.join(NDTS_FOLDER_PATH, "config") : path.join(NDTS_FOLDER_PATH, "config");
const CONFIG_PATH = platform === "linux" ? path.join(CONFIG_FOLDER_PATH, "config.json") : path.join(CONFIG_FOLDER_PATH, "config.json");
const BACKUPS_NAMES_PATH = platform === "linux" ? path.join(CONFIG_FOLDER_PATH, "backupsNames.json") : path.join(CONFIG_FOLDER_PATH, "backupsNames.json");
const SERVICES_PATH = platform === "linux" ? path.join(CONFIG_FOLDER_PATH, "services.json") : path.join(CONFIG_FOLDER_PATH, "services.json");
const DB_FOLDER_PATH = platform === "linux" ? path.join(homedir, "Dropbox/ndts/db") : path.join(usersAppDataFolder, "ndts\\db");
const DB_PATH = platform === "linux" ? path.join(DB_FOLDER_PATH, "mezach-db.sqlite") : path.join(DB_FOLDER_PATH, "mezach-db.sqlite");

// user documents
const userDocuments = getDocumentsFolder();
// user main folder
USER_MAIN_FOLDER = platform === "linux" ? path.join(homedir, `רמות מזח`) : path.join(userDocuments, `רמות מזח`);

// ndts setup files path
const APP_ROOT_PATH = app.getAppPath();
const SETUP_NDTS_FOLDER_PATH = isDev ? path.join(APP_ROOT_PATH, "extraResources") : path.join(process.resourcesPath, "extraResources");

const COPY_OPTIONS = {
  overwrite: false
};

class ConfigurationLogic {

  static paths = {
    config_folder_path: CONFIG_FOLDER_PATH,
    config_path: CONFIG_PATH,
    backups_names_path: BACKUPS_NAMES_PATH,
    services_path: SERVICES_PATH,
    db_folder_path: DB_FOLDER_PATH,
    db_path: DB_PATH,
    user_main_folder: USER_MAIN_FOLDER,
    setup_ndts_folder_path: SETUP_NDTS_FOLDER_PATH,
    app_root_path: APP_ROOT_PATH
  }

  constructor() {

  }

  async firstTimeSetup() {
    try {
      const setupJsonPath = path.join(SETUP_NDTS_FOLDER_PATH, "firstTimeSetup.json");
      const setupJsonFile = await fse.readJson(setupJsonPath);

      if (setupJsonFile.firstTime) {
        // create the dir structure for the config
        // files, db file etc...
        await fse.ensureDir(NDTS_FOLDER_PATH);
        await fse.ensureDir(CONFIG_FOLDER_PATH);
        await fse.ensureDir(DB_FOLDER_PATH);
        await fse.ensureDir(USER_MAIN_FOLDER);

        // copy configurations files to user system
        await fse.copy(path.join(SETUP_NDTS_FOLDER_PATH, "config/config.json"), CONFIG_PATH, COPY_OPTIONS);
        await fse.copy(path.join(SETUP_NDTS_FOLDER_PATH, "config/services.json"), SERVICES_PATH, COPY_OPTIONS);
        await fse.copy(path.join(SETUP_NDTS_FOLDER_PATH, "config/backupsNames.json"), BACKUPS_NAMES_PATH, COPY_OPTIONS);

        //copy clean database file to user system
        await fse.copy(path.join(SETUP_NDTS_FOLDER_PATH, "db/mezach-db.sqlite"), `${DB_PATH}`, COPY_OPTIONS);

      }

      setupJsonFile.firstTime = false;
      await fse.writeJSON(path.join(SETUP_NDTS_FOLDER_PATH, "firstTimeSetup.json"), setupJsonFile);

      this.setLocations();
    } catch (e) {
      console.log(e);
    }
  }

  async setLocations() {
    const config = await fse.readJson(CONFIG_PATH);
    config.locations.db_path = DB_PATH;
    config.locations.reports_folder = USER_MAIN_FOLDER;
    await fse.writeJSON(CONFIG_PATH, config);
  }

}

module.exports = ConfigurationLogic;