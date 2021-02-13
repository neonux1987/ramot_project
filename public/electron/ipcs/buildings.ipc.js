const { ipcMain } = require('electron');
const BuildingsDao = require('../../backend/dao/BuildingsDao');

const buildingsIpc = () => {

  //fetch month expanses data
  const buildingsDao = new BuildingsDao();

  ipcMain.on('get-buildings', (event) => {
    buildingsDao.getBuidlings().then((result) => {
      event.reply("buildings-data", { data: result });
    }).catch((error) => {
      event.reply("buildings-data", { error: error.message });
    });
  });

}

module.exports = buildingsIpc;