const { ipcMain } = require('electron');
const RestoreDbLogic = require('../../backend/logic/RestoreDbLogic');

const restoreDbIpc = () => {

  const restoreDbLogic = new RestoreDbLogic();

  ipcMain.on('restore-from-file', (event, fullPath) => {
    restoreDbLogic.restoreFromFile(fullPath).then((result) => {
      event.reply("db-restored-from-file", { data: result });
    }).catch((error) => {
      event.reply("db-restored-from-file", { error: error.message });
    });
  });

}

module.exports = restoreDbIpc;