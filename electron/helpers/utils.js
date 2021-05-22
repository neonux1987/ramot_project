const { shell, BrowserWindow } = require('electron');
const SystemPaths = require('../backend/system/SystemPaths');

exports.asyncForEach = async function (array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}

exports.openLogFile = () => {
  shell.showItemInFolder(SystemPaths.paths.log_file_path);
}

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
  const allWindows = BrowserWindow.getAllWindows();

  allWindows.forEach(window => {
    if (window.uniqueId === "mainWindow") {
      window.webContents.send(channel, data);
    } else
      throw new Error("The system could not send message to the renderer since main window is undefined");
  });

}