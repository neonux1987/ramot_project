const { ipcMain } = require("electron");
const RegisteredBackupsLogic = require("../backend/logic/RegisteredBackupsLogic");

const registeredBackupsIpc = () => {
  const registeredBackupsLogic = new RegisteredBackupsLogic();

  ipcMain.on("get-registered-backups", (event) => {
    registeredBackupsLogic
      .getRegisteredBackups()
      .then((result) => {
        //let data = nestHydrationJS.nest(result, DEFINITION);
        event.reply("registered-backups-data", { data: result });
      })
      .catch((error) => {
        event.reply("registered-backups-data", { error: error.message });
      });
  });

  ipcMain.on("initialize-registered-backups", (event) => {
    registeredBackupsLogic
      .initializeBackupsList()
      .then((result) => {
        //let data = nestHydrationJS.nest(result, DEFINITION);
        event.reply("registered-backups-initialized", { data: result });
      })
      .catch((error) => {
        event.reply("registered-backups-initialized", { error: error.message });
      });
  });

  ipcMain.handle("check-for-backups-in-folder", async (_, path) => {
    try {
      const data = await registeredBackupsLogic.checkForBackupsInFolder(path);
      return { data };
    } catch (error) {
      return { error: error.message };
    }
  });

  ipcMain.handle("scan-for-backups-and-register", async (event) => {
    try {
      const SettingsLogic = require("../backend/logic/SettingsLogic");
      const settingsLogic = new SettingsLogic();

      const settings = await settingsLogic.getSpecificSetting(
        SettingsLogic.SETTINGS_NAMES.DB_BACKUP
      );

      await registeredBackupsLogic.scanForBackupsAndRegister(
        settings.db_backups_folder_path
      );
    } catch (error) {
      return { error: error.message };
    }
  });
};

module.exports = registeredBackupsIpc;
