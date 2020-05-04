const { ipcMain } = require('electron');
const dbBackupSvc = require('../../backend/services/DbBackupSvc');

const dbBackupIpc = () => {

  ipcMain.on('initiate-db-backup', (event) => {
    dbBackupSvc.initiateBackup().then((result) => {
      event.reply("db-backup-initiated", { data: result });
    }).catch((error) => {
      event.reply("db-backup-initiated", { error: error.message });
    });
  });

  ipcMain.on('db-independent-backup', (event, fullPath) => {
    dbBackupSvc.independentBackup(fullPath).then((result) => {
      event.reply("db-independently-backed-up", { data: result });
    }).catch((error) => {
      event.reply("db-independently-backed-up", { error: error.message });
    });
  });

}

module.exports = dbBackupIpc;