const { ipcMain, BrowserWindow } = require('electron');
const { autoUpdater, CancellationToken } = require('electron-updater');
const isDev = require('electron-is-dev');
const logManager = require('../backend/logger/LogManager');

const sendToWindow = (event, data) => {
  const currentWindow = BrowserWindow.getFocusedWindow();
  currentWindow.webContents.send(event, data);
}
const updatesIpc = () => {
  // in production if we won't set the token
  // with the setFeedUrl programatically it won't
  // find the token even if it's in the electron-builder.yml
  // this method fixes it in production
  if (!isDev) {
    const feedInfo = {
      'provider': 'github',
      'owner': 'neonux1987',
      'repo': 'financial_reports_management_system',
      'token': 'f55ef78253864c051c9520dca400f7a8313ff8fa'
    };

    autoUpdater.setFeedURL(feedInfo);
  }

  autoUpdater.autoDownload = false;
  autoUpdater.autoInstallOnAppQuit = false;
  autoUpdater.logger = logManager.getLogger();

  let cancellationToken = undefined;

  ipcMain.on('check-for-updates', (event) => {

    const currentVersion = autoUpdater.currentVersion.version;

    autoUpdater.checkForUpdates().then((info) => {
      const { version, releaseDate } = info.versionInfo;

      if (version !== currentVersion)
        event.sender.send('checked_for_updates', { data: { version, releaseDate } });
      else
        event.sender.send('checked_for_updates', { data: null });
    }).catch(() => {
      event.sender.send('checked_for_updates', { error: "בדיקת עידכונים חדשים נכשלה" });
    });
  });

  ipcMain.on('abort-download', (event) => {
    if (cancellationToken) {
      cancellationToken.cancel();
    }

    if (cancellationToken === undefined || cancellationToken._cancelled)
      sendToWindow('download_aborted', { data: {} });
    else
      sendToWindow('download_aborted', { error: "המערכת לא הצליחה לבטל את ההורדה" });
  });

  autoUpdater.on('checking-for-update', () => {
    //console.log('Checking for update');
  })

  autoUpdater.on('update-not-available', () => {
    sendToWindow('update_not_available', { data: {} });
  })

  autoUpdater.on('update-available', (updateInfo) => {
    sendToWindow('update_available', { data: updateInfo });
  });

  autoUpdater.on('update-downloaded', (info) => {
    sendToWindow('update_downloaded', { data: info });
  });

  autoUpdater.on('download-progress', (progressObj) => {
    let log_message = "Download speed: " + progressObj.bytesPerSecond;
    log_message = log_message + ' - Downloaded ' + progressObj.percent + '%';
    log_message = log_message + ' (' + progressObj.transferred + "/" + progressObj.total + ')';
    sendToWindow('download_progress', progressObj);
  })

  autoUpdater.on('error', (error) => {
    console.log("onerror", error);
    if (!cancellationToken._cancelled) cancellationToken.cancel();
    sendToWindow('updater_error', { error: error.message });
  });

  ipcMain.on('download-update', () => {
    cancellationToken = new CancellationToken();
    autoUpdater.downloadUpdate(cancellationToken).catch((error) => {
      // do nothing because most likely it was cancelled by user
      // plus need ti fix the problem 
      // "Cannot download differentially, fallback to full download: Error"
      //sendToWindow('updater_error', { error: error.message });
      console.log("download-update", error);
    });
  });

  ipcMain.on('delete-update', (event, path) => {
    const fse = require('fs-extra');

    fse.remove(path).then(() => {
      sendToWindow('update_deleted', { data: {} });
    }).catch((error) => {
      console.log(error);
      sendToWindow('update_deleted', { error: "המערכת לא הצליחה למחוק את העידכון. אתחל את האפליקציה ולאחר מכן נסה שנית." });
    });
  });

  ipcMain.on('install-update', () => {
    autoUpdater.quitAndInstall();
    console.log("installing update");
  });


}

module.exports = updatesIpc;