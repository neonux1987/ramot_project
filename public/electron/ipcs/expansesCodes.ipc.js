const { ipcMain } = require('electron');
const ExpansesCodesLogic = require('../../backend/logic/ExpansesCodesLogic');

const expansesCodesIpc = (connection) => {

  //fetch month expanses data
  const expansesCodesLogic = new ExpansesCodesLogic(connection);

  ipcMain.on('get-expanses-codes-data', (event, arg) => {
    expansesCodesLogic.getExpansesCodes(arg).then((result) => {
      event.sender.send("expanses-codes-data", { data: result });
    }).catch((error) => {
      event.reply("expanses-codes-data", { error: error.message });
    });
  });

  ipcMain.on('update-expanse-code', (event, arg) => {
    expansesCodesLogic.updateExpanseCode(arg).then((result) => {
      event.sender.send("expanse-code-updated", { data: result });
    }).catch((error) => {
      event.reply("expanse-code-updated", { error: error.message });
    });
  });

  ipcMain.on('add-expanse-code', (event, arg) => {

    expansesCodesLogic.addExpanseCode(arg).then((result) => {
      //extract the id from the array
      result = result[0];
      event.sender.send("expanse-code-added", { data: result });
    }).catch((error) => {
      event.reply("expanse-code-added", { error: error.message });
    });
  });

}

module.exports = expansesCodesIpc;