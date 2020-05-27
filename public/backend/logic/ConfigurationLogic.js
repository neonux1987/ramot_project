const { app } = require('electron');
const isDev = require('electron-is-dev');
const path = require('path');
const { getDocumentsFolder, getDataHome } = require('platform-folders');
const fse = require('fs-extra');

const usersAppDataFolder = getDataHome();

// configuration files paths
const NDTS_FOLDER_PATH = path.join(usersAppDataFolder, "ramot group data");

const CONFIG_FOLDER_PATH = path.join(NDTS_FOLDER_PATH, "config");
const CONFIG_PATH = path.join(CONFIG_FOLDER_PATH, "config.json");
const BACKUPS_NAMES_PATH = path.join(CONFIG_FOLDER_PATH, "backupsNames.json");
const SERVICES_PATH = path.join(CONFIG_FOLDER_PATH, "services.json");

const DB_FOLDER_PATH = path.join(NDTS_FOLDER_PATH, "db");
const DB_PATH = path.join(DB_FOLDER_PATH, "mezach-db.sqlite");
const DB_BACKUPS_FOLDER_PATH = path.join(NDTS_FOLDER_PATH, "db backups");

// user documents
const userDocuments = getDocumentsFolder();
// user main folder
USER_MAIN_FOLDER = path.join(userDocuments, `קבוצת רמות`);
USER_REPORTS_FOLDER = path.join(USER_MAIN_FOLDER, `דוחות`);
LOGS_FOLDER = path.join(USER_MAIN_FOLDER, `logs`);
LOG_FILE = path.join(LOGS_FOLDER, `ramot-group-app-errors.log`);

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
    db_file_path: DB_PATH,
    db_backup_folder_path: DB_BACKUPS_FOLDER_PATH,
    setup_ndts_folder_path: SETUP_NDTS_FOLDER_PATH,
    app_root_path: APP_ROOT_PATH,
    logs_folder: LOGS_FOLDER,
    log_file: LOG_FILE
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
        await fse.ensureDir(DB_BACKUPS_FOLDER_PATH);
        await fse.ensureDir(USER_MAIN_FOLDER);
        await fse.ensureDir(USER_REPORTS_FOLDER);

        // copy configurations files to user system
        await fse.copy(path.join(SETUP_NDTS_FOLDER_PATH, "config/config.json"), CONFIG_PATH, COPY_OPTIONS);
        await fse.copy(path.join(SETUP_NDTS_FOLDER_PATH, "config/services.json"), SERVICES_PATH, COPY_OPTIONS);
        await fse.copy(path.join(SETUP_NDTS_FOLDER_PATH, "config/backupsNames.json"), BACKUPS_NAMES_PATH, COPY_OPTIONS);

        //copy clean database file to user system
        await fse.copy(path.join(SETUP_NDTS_FOLDER_PATH, "db/mezach-db.sqlite"), `${DB_PATH}`, COPY_OPTIONS);

        setupJsonFile.firstTime = false;
        await fse.writeJSON(path.join(SETUP_NDTS_FOLDER_PATH, "firstTimeSetup.json"), setupJsonFile);

        this.setLocations();
      }
    } catch (e) {
      console.log(e);
    }
  }

  async setLocations() {
    const config = await fse.readJson(CONFIG_PATH);

    config.locations.db_file_path = DB_PATH;
    config.locations.db_folder_path = DB_FOLDER_PATH;

    config.locations.db_backups_folder_path = DB_BACKUPS_FOLDER_PATH;
    config.db_backup.path = DB_BACKUPS_FOLDER_PATH;

    config.locations.reports_folder_path = USER_REPORTS_FOLDER;

    config.locations.config_folder_path = CONFIG_FOLDER_PATH;
    config.locations.config_file_path = CONFIG_PATH;
    config.locations.services_file_path = SERVICES_PATH;
    config.locations.backups_names_file_path = BACKUPS_NAMES_PATH;

    config.location.logs_folder = LOGS_FOLDER;
    config.location.log_file = LOG_FILE;

    await fse.writeJSON(CONFIG_PATH, config);
  }

}

module.exports = ConfigurationLogic;