const { ipcMain } = require('electron');
const SettingsLogic = require('../../backend/logic/SettingsLogic');
const dbBackupSvc = require('../../backend/services/DbBackupSvc');

const settingsIpc = () => {

  //fetch month expanses data
  const settingsLogic = new SettingsLogic();

  ipcMain.on('get-settings', (event) => {
    settingsLogic.getSettings().then((result) => {
      //let data = nestHydrationJS.nest(result, DEFINITION);
      event.reply("settings-data", { data: result });
    }).catch((error) => {
      event.reply("settings-data", { error: error.message });
    });
  });

  ipcMain.on('save-settings', (event, data) => {
    settingsLogic.updateSettings(data).then((result) => {
      //re-schedule backup date and time
      dbBackupSvc.modifySchedule(result).catch((error) => {
        console.log(error);
        event.reply("saved-settings", { error: error.message });
      });
      return result;
    }).then((result) => {
      event.reply("saved-settings", { data: result });
    }).catch((error) => {
      console.log(error);
      event.reply("saved-settings", { error: error.message });
    });
  });

  ipcMain.on('get-backups-names', (event) => {
    settingsLogic.getBackupsNames().then((result) => {
      //let data = nestHydrationJS.nest(result, DEFINITION);
      event.reply("backups-names-data", { data: result });
    }).catch((error) => {
      event.reply("backups-names-data", { error: error.message });
    });
  });

}

module.exports = settingsIpc;