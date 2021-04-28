const { ipcMain } = require('electron');
const MenuLogic = require('../backend/logic/MenuLogic');

const menuIpc = () => {

  //prepare renderer menu
  const menuLogic = new MenuLogic();

  ipcMain.on("get-menu", (event, arg) => {
    menuLogic.getMenu().then((result) => {
      //converts the result to support nested array of objects
      //if an innerJoin is used
      event.sender.send("menu-data", { data: result });
    }).catch((error) => {
      event.reply("menu-data", { error: error.message });
    });
  });

}

module.exports = menuIpc;