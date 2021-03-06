const { ipcMain } = require('electron');
const backupLogic = require('../../backend/logic/backupLogic');

const dbBackupIpc = () => {

  ipcMain.on('initiate-db-backup', (event) => {
    backupLogic.initiateBackup().then((result) => {
      event.reply("db-backup-initiated", { data: result });
    }).catch((error) => {
      event.reply("db-backup-initiated", { error: error.message });
    });
  });

  ipcMain.on('db-independent-backup', (event, fullPath) => {
    backupLogic.independentBackup(fullPath).then((result) => {
      event.reply("db-independently-backed-up", { data: result });
    }).catch((error) => {
      event.reply("db-independently-backed-up", { error: error.message });
    });
  });

}

module.exports = dbBackupIpc;