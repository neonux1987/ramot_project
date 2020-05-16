const { ipcMain } = require('electron');
const RestoreDbLogic = require('../../backend/logic/RestoreDbLogic');

const restoreDbIpc = () => {

  const restoreDbLogic = new RestoreDbLogic();

  ipcMain.on('restore-from-file', (event, path) => {
    console.log("yes");
    restoreDbLogic.restoreFromFile(path).then((result) => {
      event.reply("db-restored-from-file", { data: result });
    }).catch((error) => {
      event.reply("db-restored-from-file", { error: error.message });
    });
  });

}

module.exports = restoreDbIpc;