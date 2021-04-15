const { ipcMain } = require('electron');
const MenuDao = require('../backend/dao/MenuDao');

const sidearIpc = () => {

  //prepare renderer menu
  const menuDao = new MenuDao();

  ipcMain.on("get-menu", (event, arg) => {
    menuDao.getMenu().then((result) => {
      //converts the result to support nested array of objects
      //if an innerJoin is used
      event.sender.send("menu-data", { data: result });
    }).catch((error) => {
      event.reply("menu-data", { error: error.message });
    });
  });

}

module.exports = sidearIpc;