const { ipcMain } = require('electron');
const dbBackupSvc = require('../../backend/services/DbBackupSvc');

const dbBackupIpc = () => {

  ipcMain.on('enable-db-backup', (event) => {
    dbBackupSvc.activate().then((result) => {
      event.reply("db-backup-enabled", { data: result });
    }).catch((error) => {
      event.reply("db-backup-enabled", { error: error.message });
    });
  });

  ipcMain.on('disable-db-backup', (event) => {
    dbBackupSvc.stop().then((result) => {
      event.reply("db-backup-disabled", { data: result });
    }).catch((error) => {
      event.reply("db-backup-disabled", { error: error.message });
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