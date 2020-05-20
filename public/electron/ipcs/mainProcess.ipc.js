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

}

module.exports = mainProcessIpc;