const { app } = require("electron");
const path = require("path");
const isDev = process.env.NODE_ENV === "development";
const APP_ROOT_PATH = app.getAppPath();

const devDataFolder = path.join(__dirname, "../../../dev");
const usersAppDataFolder = isDev ? devDataFolder : app.getPath("appData");

// ramot group data folder location
const RAMOT_GROUP_FOLDER_PATH = path.join(
  usersAppDataFolder,
  "ramot group data"
);

// config folder and config files location
const CONFIG_FOLDER_PATH = path.join(RAMOT_GROUP_FOLDER_PATH, "config");
const CONFIG_FILE_PATH = path.join(CONFIG_FOLDER_PATH, "config.json");
const BACKUPS_NAMES_FILE_PATH = path.join(
  CONFIG_FOLDER_PATH,
  "backupsNames.json"
);

// database folder and database file location
const DB_FILE_NAME = "ramot-group-db";
const DB_FOLDER_PATH = path.join(RAMOT_GROUP_FOLDER_PATH, "database");
const DB_FILE_PATH = path.join(DB_FOLDER_PATH, `${DB_FILE_NAME}.sqlite`);
process.env.RAMOT_DB_FILE_PATH = DB_FILE_PATH;

// database backups folder location
const DB_BACKUPS_FOLDER_PATH = path.join(
  usersAppDataFolder,
  "ramot group backups"
);

// ramot group temp folder location
const APP_TEMP_FOLDER = path.join(app.getPath("temp"), "ramot-group-temp");

// user's main folder, with reports sub folder and
// log sub folder and file location
const USER_MAIN_FOLDER = path.join(app.getPath("documents"), `קבוצת רמות`);
const USER_REPORTS_FOLDER = path.join(USER_MAIN_FOLDER, `דוחות`);
const LOGS_FOLDER_PATH = path.join(RAMOT_GROUP_FOLDER_PATH, "logs");
const LOG_FILE_PATH = path.join(LOGS_FOLDER_PATH, `ramot-group-errors.log`);

// ramot group resources folder location for setup
const SETUP_FOLDER_PATH = isDev
  ? path.join(APP_ROOT_PATH, "extraResources")
  : path.join(process.resourcesPath, "extraResources");

class SystemPaths {
  static paths = {
    ramot_group_folder_path: RAMOT_GROUP_FOLDER_PATH,
    config_folder_path: CONFIG_FOLDER_PATH,
    config_file_path: CONFIG_FILE_PATH,
    backups_names_file_path: BACKUPS_NAMES_FILE_PATH,
    db_folder_path: DB_FOLDER_PATH,
    db_file_path: DB_FILE_PATH,
    db_backups_folder_path: DB_BACKUPS_FOLDER_PATH,
    setup_folder_path: SETUP_FOLDER_PATH,
    app_root_path: APP_ROOT_PATH,
    logs_folder_path: LOGS_FOLDER_PATH,
    log_file_path: LOG_FILE_PATH,
    user_main_folder: USER_MAIN_FOLDER,
    user_reports_folder: USER_REPORTS_FOLDER,
    app_temp_folder: APP_TEMP_FOLDER
  };

  static info = {
    db_file_name: DB_FILE_NAME
  };
}

module.exports = SystemPaths;
