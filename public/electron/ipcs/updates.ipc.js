const { ipcMain, BrowserWindow } = require('electron');
const { autoUpdater, CancellationToken } = require('electron-updater');

const updatesIpc = () => {

  const currentWindow = BrowserWindow.getFocusedWindow();

  autoUpdater.on('checking-for-update', () => {
    console.log('Checking for update...');
  })

  autoUpdater.on('update-not-available', (info) => {
    console.log('Update not available.');
  })

  autoUpdater.on('update-available', (event) => {
    currentWindow.webContents.send('update_available', event.version);
  });
  autoUpdater.on('update-downloaded', () => {
    //currentWindow.webContents.send('update_downloaded');
    console.log("downloaded");
  });

  autoUpdater.on('download-progress', (progressObj) => {
    let log_message = "Download speed: " + progressObj.bytesPerSecond;
    log_message = log_message + ' - Downloaded ' + progressObj.percent + '%';
    log_message = log_message + ' (' + progressObj.transferred + "/" + progressObj.total + ')';
    console.log(log_message);
  })

  autoUpdater.on('error', (err) => {
    console.log(err);
  })

  ipcMain.on('update-app', () => {
    appUpdater.downloadUpdate(cancellationToken).catch(() => {
      cancellationToken.cancel();
    });
    autoUpdater.quitAndInstall();
  });


}

module.exports = updatesIpc;