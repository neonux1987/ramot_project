const { ipcMain } = require("electron");
const SettingsLogic = require("../backend/logic/SettingsLogic");

const settingsIpc = () => {
  //fetch month expanses data
  const settingsLogic = new SettingsLogic();

  ipcMain.on("get-settings", (event) => {
    settingsLogic
      .getSettings()
      .then((result) => {
        event.reply("settings-data", { data: result });
      })
      .catch((error) => {
        event.reply("settings-data", { error: error.message });
      });
  });

  ipcMain.handle("get-settings-invoke", async (_) => {
    try {
      const data = await settingsLogic.getSettings();
      return { data };
    } catch (error) {
      return { error: error.message };
    }
  });

  ipcMain.on("get-specific-setting", (event, settingName) => {
    settingsLogic
      .getSpecificSetting(settingName)
      .then((result) => {
        //let data = nestHydrationJS.nest(result, DEFINITION);
        event.reply("specific-setting-data", { data: result, settingName });
      })
      .catch((error) => {
        event.reply("specific-setting-data", { error: error.message });
      });
  });

  ipcMain.on("get-locations-settings", (event, settingName) => {
    settingsLogic
      .getLocationsSettings()
      .then((result) => {
        //let data = nestHydrationJS.nest(result, DEFINITION);
        event.reply("locations-settings-data", { data: result, settingName });
      })
      .catch((error) => {
        event.reply("locations-settings-data", { error: error.message });
      });
  });

  ipcMain.on("get-db-backup-settings", (event, settingName) => {
    settingsLogic
      .getDbBackupSettings()
      .then((result) => {
        //let data = nestHydrationJS.nest(result, DEFINITION);
        event.reply("db-backup-settings-data", { data: result, settingName });
      })
      .catch((error) => {
        event.reply("db-backup-settings-data", { error: error.message });
      });
  });

  ipcMain.on("get-db-restore-settings", (event, settingName) => {
    settingsLogic
      .getDbRestoreSettings()
      .then((result) => {
        //let data = nestHydrationJS.nest(result, DEFINITION);
        event.reply("db-restore-settings-data", { data: result, settingName });
      })
      .catch((error) => {
        event.reply("db-restore-settings-data", { error: error.message });
      });
  });

  ipcMain.on("update-specific-setting", (event, { settingName, payload }) => {
    settingsLogic
      .updateSpecificSetting(settingName, payload)
      .then((result) => {
        //let data = nestHydrationJS.nest(result, DEFINITION);
        event.reply("specific-setting-updated", { data: result });
      })
      .catch((error) => {
        event.reply("specific-setting-updated", { error: error.message });
      });
  });

  ipcMain.on("save-settings", (event, data) => {
    settingsLogic
      .updateSettings(data)
      .then((result) => {
        event.reply("saved-settings", { data: result });
      })
      .catch((error) => {
        event.reply("saved-settings", { error: error.message });
      });
  });
};

module.exports = settingsIpc;
