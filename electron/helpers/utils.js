const { app, dialog, shell, BrowserWindow } = require('electron');
const path = require('path');

const SystemPaths = require('../backend/system/SystemPaths');

exports.asyncForEach = async function (array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}

function openLogFile() {
  shell.showItemInFolder(SystemPaths.paths.log_file_path);
}
exports.openLogFile = openLogFile;

/**
 * since on start of the app we are using a loading window
 * when we used to get the focused window it would give us the loading window
 * as undfined instead of mainWindow since he's getting closed after mainWindow is loaded
 * so to prevent that, we iterate over all the avaliable windows and find
 * the mainWindow by uniqueId we gave it in the main.js
 * @param {*} channel to use to send the message
 * @param {*} data to be sent
 */
exports.sendToWindow = (channel, data) => {
  const window = getWindow("mainWindow");

  if (window)
    window.webContents.send(channel, data);
  else
    throw new Error("The system could not send message to the renderer since main window is undefined");
}

function getWindow(id) {
  const allWindows = BrowserWindow.getAllWindows();
  let desiredWindow = undefined;

  allWindows.forEach(window => {
    if (window.uniqueId === id) {
      desiredWindow = window;
    }
  });

  return desiredWindow;
}

exports.getWindow = getWindow;

function createRestoreDbWindow() {
  const icon = path.join(app.getAppPath(), 'Icon/ramot-group-icon.png');
  const isDev = !app.isPackaged;

  const restoreDbWindow = new BrowserWindow({
    minWidth: 1280,
    minHeight: 720,
    width: 1280,
    height: 720,
    title: "אשף שיחזור בסיס נתונים",
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true
    },
    backgroundColor: "#eee",
    icon,
    resizeable: false,
    show: false
  });

  restoreDbWindow.loadURL(isDev ? 'http://localhost:3000/?page=restoreDB' : `file://${path.join(__dirname, '../build/index.html?page=restoreDB')}`)
  restoreDbWindow.show();
}

exports.AppErrorDialog = async () => {
  const title = "שגיאת הפעלה";
  const message = `
      המערכת נכשלה בעת ההפעלה עקב תקלה.\n
      לפרטים נוספים יש לקרוא את יומן האירועים שנמצא בתיקייה
      ${SystemPaths.paths.logs_folder_path}
      `;

  const loadingWindow = getWindow("loadingWindow");
  if (loadingWindow) loadingWindow.hide();

  const dialogData = await dialog.showMessageBox({
    title,
    message,
    type: "error",
    buttons: ["אשף שיחזור בסיס נתונים", "פתח יומן אירועים", "סגור את האפליקציה"]
  });

  if (dialogData.response === 0) {

    // close main window so it won't
    // interfer with the restore db window
    const mainWindow = getWindow("mainWindow");
    if (mainWindow) mainWindow.close();

    const registeredBackupsIpc = require('../ipcs/registeredBackups.ipc');
    const restoreDbIpc = require('../ipcs/restoreDb.ipc');
    const mainProcessIpc = require('../ipcs/mainProcess.ipc');
    // need the registered backups ipc in order for the restore 
    // renderer be able to fetch backups from the backend
    registeredBackupsIpc();
    restoreDbIpc();
    mainProcessIpc();
    createRestoreDbWindow();

    // after the restore db window loaded only
    // otherwise the app will be terminated
    if (loadingWindow) loadingWindow.close();
  }
  else if (dialogData.response === 1) {
    openLogFile();
    app.quit(0);
  }
  else if (dialogData.response === 2)
    app.quit(0);
}