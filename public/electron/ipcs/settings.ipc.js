const { ipcMain } = require('electron');
const SettingsLogic = require('../../backend/logic/SettingsLogic');

const settingsIpc = (connection) => {

  //fetch month expanses data
  const settingsLogic = new SettingsLogic(connection);

  ipcMain.on('get-settings', (event) => {
    settingsLogic.getSettings().then((result) => {
      //let data = nestHydrationJS.nest(result, DEFINITION);
      event.reply("settings-data", { data: result });
    }).catch((error) => {
      event.reply("settings-data", { error: error.message });
    });
  });

  ipcMain.on('save-settings', (event, data) => {
    console.log(data);
    settingsLogic.updateSettings(data).then((result) => {
      event.reply("saved-settings", { data: result });
    }).catch((error) => {
      event.reply("saved-settings", { error: error.message });
    });
  });



}

module.exports = settingsIpc;