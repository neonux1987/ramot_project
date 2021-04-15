const { ipcMain } = require('electron');
const RestoreDbLogic = require('../backend/logic/RestoreDbLogic');

const restoreDbIpc = () => {

  const restoreDbLogic = new RestoreDbLogic();

  ipcMain.on('restore-from-list', (event, fileName) => {
    restoreDbLogic.restoreFromList(fileName).then((result) => {
      event.reply("db-restored-from-list", { data: result });
    }).catch((error) => {
      event.reply("db-restored-from-list", { error: error.message });
    });
  });

  ipcMain.on('restore-from-file', (event, path) => {
    restoreDbLogic.restoreFromFile(path).then((result) => {
      event.reply("db-restored-from-file", { data: result });
    }).catch((error) => {
      event.reply("db-restored-from-file", { error: error.message });
    });
  });

}

module.exports = restoreDbIpc;