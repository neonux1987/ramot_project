const { app, dialog, shell, BrowserWindow } = require("electron");

const SystemPaths = require("../backend/system/SystemPaths");

exports.asyncForEach = async function (array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
};

function openLogFile() {
  shell.openPath(SystemPaths.paths.log_file_path);
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

  if (window) window.webContents.send(channel, data);
  else
    throw new Error(
      "The system could not send message to the renderer since main window is undefined"
    );
};

function getWindow(id) {
  const allWindows = BrowserWindow.getAllWindows();
  let desiredWindow = undefined;

  allWindows.forEach((window) => {
    if (window.uniqueId === id) {
      desiredWindow = window;
    }
  });

  return desiredWindow;
}

exports.getWindow = getWindow;

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
    buttons: ["פתח יומן אירועים", "סגור את האפליקציה"]
  });

  if (dialogData.response === 0) {
    openLogFile();
    app.quit(0);
  } else if (dialogData.response === 2) app.quit(0);
};

exports.NoAdminPrivilegesErrorDialog = async () => {
  const title = "שגיאת אין הרשאות מנהל מערכת";
  const message = `נא להפעיל את האפליקציה עם הרשאות מנהל מערכת!
  
  `;

  const loadingWindow = getWindow("loadingWindow");

  const dialogData = await dialog.showMessageBox(loadingWindow, {
    title,
    message,
    type: "error",
    buttons: ["סגור"]
  });

  if (dialogData.response === 0) app.quit(0);
};

exports.NoDBErrorDialog = async () => {
  const createRestoreDbWindow = require("../windows/restore_window");
  const title = "שגיאת קובץ בסיס נתונים";
  const message = "המערכת נכשלה בקריאת קובץ בסיס הנתונים מכיוון שלא קיים.";

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

    const registeredBackupsIpc = require("../ipcs/registeredBackups.ipc");
    const restoreDbIpc = require("../ipcs/restoreDb.ipc");
    const mainProcessIpc = require("../ipcs/mainProcess.ipc");
    // need the registered backups ipc in order for the restore
    // renderer be able to fetch backups from the backend
    registeredBackupsIpc();
    restoreDbIpc();
    mainProcessIpc();
    createRestoreDbWindow();

    // after the restore db window loaded only
    // otherwise the app will be terminated
    if (loadingWindow) loadingWindow.close();
  } else if (dialogData.response === 1) {
    openLogFile();
    app.quit(0);
  } else if (dialogData.response === 2) app.quit(0);
};

exports.checkIsNeedAdminRights = async () => {
  const isElevated = require("native-is-elevated")();

  if (app.getAppPath().includes(process.env.SystemDrive) && !isElevated) {
    this.NoAdminPrivilegesErrorDialog();
    throw new Error("The app needs admin privileges in order to run");
  }
};

exports.compressToZip = async function (filesList = [], zipfilePath) {
  const AdmZip = require("adm-zip");

  const zip = new AdmZip();

  filesList.forEach(({ filename, content }) => {
    zip.addFile(filename, content);
  });

  // write to disk
  zip.writeZip(zipfilePath);
};

exports.extractZip = async function (zipfilePath, targetPath) {
  const AdmZip = require("adm-zip");

  const zip = new AdmZip(zipfilePath);
  zip.extractAllTo(targetPath);
};
