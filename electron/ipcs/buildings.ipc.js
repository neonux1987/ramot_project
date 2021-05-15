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

  ipcMain.on('add-building', (event, params) => {
    buildingsLogic.addBuilding(params).then((result) => {
      event.reply("added-building", { data: result });
    }).catch((error) => {
      event.reply("added-building", { error: error.message });
    });
  });

  ipcMain.on('update-building', (event, params) => {
    buildingsLogic.updateBuilding(params).then((result) => {
      event.reply("updated-building", { data: result });
    }).catch((error) => {
      event.reply("updated-building", { error: error.message });
    });
  });

}

module.exports = buildingsIpc;