const { ipcMain } = require('electron');
const BuildingsLogic = require('../backend/logic/BuildingsLogic');

const buildingsIpc = () => {

  //fetch month expanses data
  const buildingsLogic = new BuildingsLogic();

  ipcMain.on('get-buildings', (event) => {
    buildingsLogic.getBuildings().then((result) => {
      event.reply("buildings-data", { data: result });
    }).catch((error) => {
      event.reply("buildings-data", { error: error.message });
    });
  });

}

module.exports = buildingsIpc;