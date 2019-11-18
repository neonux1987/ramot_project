const { ipcMain } = require('electron');
const TableSettingsLogic = require('../../backend/logic/TableSettingsLogic');

const tableSettingsIpc = (connection) => {

  const tableSettingsLogic = new TableSettingsLogic(connection);

  ipcMain.on('get-table-settings', (event, pageName) => {
    tableSettingsLogic.getTableSettings(pageName).then((result) => {
      event.sender.send("table-settings", { data: result });
    }).catch((error) => {
      event.reply("table-settings", { error: error.message });
    });
  });

  ipcMain.on('update-table-settings', (event, pageName, settings) => {
    tableSettingsLogic.updateTableSettings(pageName, settings).then((result) => {
      event.sender.send("updated-table-settings", { data: result });
    }).catch((error) => {
      event.reply("updated-table-settings", { error: error.message });
    });
  });

}

module.exports = tableSettingsIpc;