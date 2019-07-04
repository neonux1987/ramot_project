const { ipcMain } = require('electron');
const ExpansesCodesLogic = require('../../backend/logic/ExpansesCodesLogic');

const expansesCodesIpc = (connection) => {

  //fetch month expanses data
  const expansesCodesLogic = new ExpansesCodesLogic(connection);

  ipcMain.on('get-expanses-codes-data', (event, arg) => {
    console.log("ipc");
    expansesCodesLogic.getExpansesCodes(arg).then((result) => {
      event.sender.send("expanses-codes-data", { data: result });
    }).catch((error) => {
      event.reply("expanses-codes-data", { error: error.message });
    });
  });

}

module.exports = expansesCodesIpc;