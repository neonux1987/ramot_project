const { ipcMain } = require('electron');
const GeneralSettingsLogic = require('../../backend/logic/GeneralSettingsLogic');

const generalSettingsIpc = (connection) => {

  //fetch month expanses data
  const generalSettingsLogic = new GeneralSettingsLogic(connection);

  ipcMain.on('get-general-settings', (event, arg) => {
    generalSettingsLogic.getGeneralSettingsTrx().then((result) => {
      event.sender.send("general-settings-data", { data: result });
    }).catch((error) => {
      event.reply("general-settings-data", { error: error.message });
    });
  });

  ipcMain.on('update-general-settings', (event, arg) => {
    generalSettingsLogic.updateGeneralSettings(arg).then((result) => {
      event.sender.send("updated-general-settings", { data: result });
    }).catch((error) => {
      event.reply("updated-general-settings", { error: error.message });
    });
  });

}

module.exports = generalSettingsIpc;