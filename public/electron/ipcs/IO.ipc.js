const { ipcMain } = require('electron');
const IOLogic = require('../../backend/logic/IOLogic');

const saveFileIpc = (connection) => {

  //prepare renderer menu
  const iOLogic = new IOLogic(connection);

  ipcMain.on("save-file", (event, filePath) => {
    iOLogic.writeFile.then((result) => {
      event.sender.send("file-saved", { data: result });
    }).catch((error) => {
      event.reply("file-saved", { error: error.message });
    });
  });

}

module.exports = saveFileIpc;