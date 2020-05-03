const { ipcMain } = require('electron');
const MainProcessLogic = require('../../backend/logic/MainProcessLogic');

const mainProcessIpc = () => {

  const mainProcessLogic = new MainProcessLogic();

  ipcMain.on('quit-app', (event) => {
    mainProcessLogic.quit();

  });

  ipcMain.on('restart-app', (event) => {
    mainProcessLogic.restart().then((result) => {
      event.reply("app-restarted", { data: result });
    }).catch((error) => {
      event.reply("app-restarted", { error: error.message });
    });
  });

}

module.exports = mainProcessIpc;