
const { ipcMain } = require('electron');
const RegisteredBackupsLogic = require('../../backend/logic/RegisteredBackupsLogic');

const registeredBackupsIpc = () => {

  const registeredBackupsLogic = new RegisteredBackupsLogic();

  ipcMain.on('get-registered-backups', (event) => {
    registeredBackupsLogic.getRegisteredBackups().then((result) => {
      //let data = nestHydrationJS.nest(result, DEFINITION);
      event.reply("registered-backups-data", { data: result });
    }).catch((error) => {
      event.reply("registered-backups-data", { error: error.message });
    });
  });

  ipcMain.on('initialize-registered-backups', (event) => {
    registeredBackupsLogic.initializeBackupsList().then((result) => {
      //let data = nestHydrationJS.nest(result, DEFINITION);
      event.reply("registered-backups-initialized", { data: result });
    }).catch((error) => {
      event.reply("registered-backups-initialized", { error: error.message });
    });
  });

}

module.exports = registeredBackupsIpc;