const { app } = require("electron");
const isDev = require("electron-is-dev");
const path = require("path");

const DB_FILE_NAME = "ramot-group-db";

const usersAppDataFolder = app.getPath("appData");

// configuration files paths
const RAMOT_GROUP_FOLDER_PATH = path.join(
  usersAppDataFolder,
  "ramot group data"
);

const CONFIG_FOLDER_PATH = path.join(RAMOT_GROUP_FOLDER_PATH, "config");
const CONFIG_FILE_PATH = path.join(CONFIG_FOLDER_PATH, "config.json");
const BACKUPS_NAMES_FILE_PATH = path.join(
  CONFIG_FOLDER_PATH,
  "backupsNames.json"
);
const SERVICES_FILE_PATH = path.join(CONFIG_FOLDER_PATH, "services.json");

const DB_FOLDER_PATH = path.join(RAMOT_GROUP_FOLDER_PATH, "db");
const DB_FILE_PATH = path.join(DB_FOLDER_PATH, `${DB_FILE_NAME}.sqlite`);

// db backups
const DB_BACKUPS_FOLDER_PATH = path.join(
  usersAppDataFolder,
  "ramot group backups"
);

// Temp folder
const APP_TEMP_FOLDER = path.join(app.getPath("temp"), "ramot-group-temp");

// user documents
const userDocuments = app.getPath("documents");

// user main folder
const USER_MAIN_FOLDER = path.join(userDocuments, `קבוצת רמות`);
const USER_REPORTS_FOLDER = path.join(USER_MAIN_FOLDER, `דוחות`);
const LOGS_FOLDER_PATH = path.join(USER_MAIN_FOLDER, `יומן אירועים`);
const LOG_FILE_PATH = path.join(LOGS_FOLDER_PATH, `ramot-group-errors.log`);

// ndts setup files path
const APP_ROOT_PATH = app.getAppPath();
const SETUP_FOLDER_PATH = isDev
  ? path.join(APP_ROOT_PATH, "extraResources")
  : path.join(process.resourcesPath, "extraResources");

class SystemPaths {
  static paths = {
    ramot_group_folder_path: RAMOT_GROUP_FOLDER_PATH,
    config_folder_path: CONFIG_FOLDER_PATH,
    config_file_path: CONFIG_FILE_PATH,
    backups_names_file_path: BACKUPS_NAMES_FILE_PATH,
    services_file_path: SERVICES_FILE_PATH,
    db_folder_path: DB_FOLDER_PATH,
    db_file_path: DB_FILE_PATH,
    db_backups_folder_path: DB_BACKUPS_FOLDER_PATH,
    setup_folder_path: SETUP_FOLDER_PATH,
    app_root_path: APP_ROOT_PATH,
    logs_folder_path: LOGS_FOLDER_PATH,
    log_file_path: LOG_FILE_PATH,
    user_main_folder: USER_MAIN_FOLDER,
    user_reports_folder: USER_REPORTS_FOLDER,
    app_temp_folder: APP_TEMP_FOLDER,
  };

  static info = {
    db_file_name: DB_FILE_NAME,
  };
}

module.exports = SystemPaths;
