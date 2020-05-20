const { ipcMain } = require('electron');
const { autoUpdater } = require('electron-updater');
const MainProcessLogic = require('../../backend/logic/MainProcessLogic');

const mainProcessIpc = () => {

  const mainProcessLogic = new MainProcessLogic();

  ipcMain.on('quit-app', (event) => {
    mainProcessLogic.quit();

  });

  ipcMain.on('restart-app', (event) => {
    try {
      mainProcessLogic.restart()
    } catch (error) {
      event.reply("app-restarted", { error: error.message });
    }
  });

  autoUpdater.on('checking-for-update', () => {
    console.log('Checking for update...');
  })

  autoUpdater.on('update-not-available', (info) => {
    console.log('Update not available.');
  })

  autoUpdater.on('update-available', () => {
    mainWindow.webContents.send('update_available', autoUpdater.updateInfoAndProvider());
  });
  autoUpdater.on('update-downloaded', () => {
    mainWindow.webContents.send('update_downloaded');
  });

  autoUpdater.on('download-progress', (progressObj) => {
    let log_message = "Download speed: " + progressObj.bytesPerSecond;
    log_message = log_message + ' - Downloaded ' + progressObj.percent + '%';
    log_message = log_message + ' (' + progressObj.transferred + "/" + progressObj.total + ')';
    console.log(log_message);
  })

  ipcMain.on('update-app', () => {
    autoUpdater.quitAndInstall();
  });


}

module.exports = mainProcessIpc;