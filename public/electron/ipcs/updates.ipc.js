const { ipcMain, BrowserWindow } = require('electron');
const { autoUpdater, CancellationToken } = require('electron-updater');
const logManager = require('../../backend/logger/LogManager');

const updatesIpc = () => {
  const currentWindow = BrowserWindow.getFocusedWindow();

  autoUpdater.autoDownload = false;
  autoUpdater.autoInstallOnAppQuit = false;
  autoUpdater.logger = logManager.getLogger();

  let cancellationToken = undefined;

  ipcMain.on('check-for-updates', (event) => {
    const currentVersion = autoUpdater.currentVersion.version;

    autoUpdater.checkForUpdates().then((info) => {
      const { version, releaseDate } = info.versionInfo;

      if (version !== currentVersion)
        event.sender.send('checked_update', { data: { version, releaseDate } });
      else
        event.sender.send('checked_update', { data: null });
    }).catch(() => {
      event.sender.send('checked_update', { error: "בדיקת עידכונים חדשים נכשלה" });
    });
  });

  ipcMain.on('abort-download', (event) => {
    console.log("abort download");

    if (cancellationToken) {
      cancellationToken.cancel();
    }

    if (cancellationToken && cancellationToken._cancelled)
      currentWindow.webContents.send('download_aborted', { data: {} });
    else
      currentWindow.webContents.send('download_aborted', { error: "המערכת לא הצליחה לבטל את ההורדה" });
  });

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
    console.log("downloaded already");
    currentWindow.webContents.send('update_downloaded');
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

    cancellationToken = new CancellationToken();

    autoUpdater.downloadUpdate(cancellationToken)
      .then((result) => {
        console.log(result);
        currentWindow.webContents.send('downloading_update', { data: {} });
      })
      .catch(() => {

        if (cancellationToken._cancelled === false) {
          cancellationToken.cancel();
          currentWindow.webContents.send('downloading_update', { error: "כשל בהורדת העידכון" });
        }
      });
  });

  ipcMain.on('update-app', () => {
    autoUpdater.quitAndInstall();
  });


}

module.exports = updatesIpc;