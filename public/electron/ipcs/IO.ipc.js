const { ipcMain } = require('electron');
const IOLogic = require('../../backend/logic/IOLogic');

const saveFileIpc = (connection) => {

  //prepare renderer menu
  const iOLogic = new IOLogic(connection);

  ipcMain.on("save-file", (event, filePath) => {

    console.log(iOLogic.saveFile(filePath));
    /* menuDao.getMenu().then((result) => {
      //converts the result to support nested array of objects
      //if an innerJoin is used
      event.sender.send("file-saved", { data: result });
    }).catch((error) => {
      event.reply("file-saved", { error: error.message });
    }); */
  });

}

module.exports = saveFileIpc;