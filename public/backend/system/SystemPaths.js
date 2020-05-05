const { app } = require('electron');
const isDev = require('./node_modules/electron-is-dev');
const path = require('path');
const { getDocumentsFolder, getDataHome } = require('./node_modules/platform-folders');

const usersAppDataFolder = getDataHome();

// configuration files paths
const NDTS_FOLDER_PATH = path.join(usersAppDataFolder, "ndts");

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
USER_MAIN_FOLDER = path.join(userDocuments, `רמות מזח`);

// ndts setup files path
const APP_ROOT_PATH = app.getAppPath();
const SETUP_NDTS_FOLDER_PATH = isDev ? path.join(APP_ROOT_PATH, "extraResources") : path.join(process.resourcesPath, "extraResources");

module.exports = systemPaths = {
  config_folder_path: CONFIG_FOLDER_PATH,
  config_path: CONFIG_PATH,
  backups_names_path: BACKUPS_NAMES_PATH,
  services_path: SERVICES_PATH,
  db_folder_path: DB_FOLDER_PATH,
  db_file_path: DB_PATH,
  db_backup_folder_path: DB_BACKUPS_FOLDER_PATH,
  user_main_folder: USER_MAIN_FOLDER,
  setup_ndts_folder_path: SETUP_NDTS_FOLDER_PATH,
  app_root_path: APP_ROOT_PATH
}