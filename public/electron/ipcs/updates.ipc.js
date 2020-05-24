const { ipcMain, BrowserWindow } = require('electron');
const { autoUpdater, cancellationToken } = require('electron-updater');

const updatesIpc = () => {
  const currentWindow = BrowserWindow.getFocusedWindow();

  autoUpdater.autoDownload = false;
  autoUpdater.autoInstallOnAppQuit = false;

  ipcMain.on('check-for-updates', (event) => {
    const currentVersion = autoUpdater.currentVersion.version;

    autoUpdater.checkForUpdates().then((info) => {
      const { version, releaseDate } = info.versionInfo;

      if (version !== currentVersion)
        event.sender.send('checked_update', { data: { version, releaseDate } });
      else
        event.sender.send('checked_update', { data: null })
    });
  })

  autoUpdater.on('checking-for-update', () => {
    console.log('Checking for update');
  })

  autoUpdater.on('update-not-available', (info) => {
    console.log('Update not available');
  })

  autoUpdater.on('update-available', (event) => {
    currentWindow.webContents.send('update_available', event);
  });

  autoUpdater.on('update-downloaded', () => {
    //currentWindow.webContents.send('update_downloaded');
    console.log("downloaded");
  });

  autoUpdater.on('download-progress', (progressObj) => {
    let log_message = "Download speed: " + progressObj.bytesPerSecond;
    log_message = log_message + ' - Downloaded ' + progressObj.percent + '%';
    log_message = log_message + ' (' + progressObj.transferred + "/" + progressObj.total + ')';
    currentWindow.webContents.send('download_progress', progressObj);
  })

  autoUpdater.on('error', (err) => {
    console.log(err);
  })

  ipcMain.on('download-update', () => {
    console.log("download update");
    autoUpdater.downloadUpdate(cancellationToken)
      .then(() => {
        currentWindow.webContents.send('downloading_update', { data: {} });
      })
      .catch(() => {
        cancellationToken.cancel();
        currentWindow.webContents.send('downloading_update', { error: "כשל בהורדת העידכון" });
      });
  });

  ipcMain.on('update-app', () => {
    autoUpdater.quitAndInstall();
  });


}

module.exports = updatesIpc;