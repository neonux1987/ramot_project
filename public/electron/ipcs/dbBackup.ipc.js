const { ipcMain } = require('electron');
const DbBackupSvc = require('../../backend/services/DbBackupSvc');

const dbBackupIpc = () => {

  //fetch month expanses data
  const dbBackupSvc = new DbBackupSvc();

  ipcMain.on('enable-db-backup', (event) => {
    dbBackupSvc.activate().then((result) => {
      //let data = nestHydrationJS.nest(result, DEFINITION);
      event.reply("db-backup-enabled", { data: result });
    }).catch((error) => {
      console.log(error);
      event.reply("db-backup-enabled", { error: error.message });
    });
  });

  ipcMain.on('disable-db-backup', (event) => {
    dbBackupSvc.stop().then((result) => {
      //let data = nestHydrationJS.nest(result, DEFINITION);
      event.reply("db-backup-disabled", { data: result });
    }).catch((error) => {
      console.log(error);
      event.reply("db-backup-disabled", { error: error.message });
    });
  });

}

module.exports = dbBackupIpc;