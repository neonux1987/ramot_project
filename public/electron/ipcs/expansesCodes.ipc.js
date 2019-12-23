const { ipcMain } = require('electron');
const ExpansesCodesLogic = require('../../backend/logic/ExpansesCodesLogic');

const expansesCodesIpc = (connection) => {

  //fetch month expanses data
  const expansesCodesLogic = new ExpansesCodesLogic(connection);

  ipcMain.on('get-expanses-codes-by-status', (event, status) => {
    expansesCodesLogic.getExpansesCodesByStatus(status).then((result) => {
      event.sender.send("expanses-codes-by-status", { data: result });
    }).catch((error) => {
      event.reply("expanses-codes-by-status", { error: error.message });
    });
  });

  ipcMain.on('get-expanses-codes', (event, status) => {
    expansesCodesLogic.getExpansesCodes(status).then((result) => {
      event.sender.send("expanses-codes", { data: result });
    }).catch((error) => {
      event.reply("expanses-codes", { error: error.message });
    });
  });

  ipcMain.on('update-expanse-code', (event, params) => {
    expansesCodesLogic.updateExpanseCode(params).then((result) => {
      event.sender.send("expanse-code-updated", { data: result });
    }).catch((error) => {
      event.reply("expanse-code-updated", { error: error.message });
    });
  });

  ipcMain.on('add-expanse-code', (event, data) => {

    expansesCodesLogic.addExpanseCode(data).then((result) => {
      //extract the id from the array
      result = result[0];
      event.sender.send("expanse-code-added", { data: result });
    }).catch((error) => {
      event.reply("expanse-code-added", { error: error.message });
    });
  });

  ipcMain.on('delete-expanse-code', (event, id) => {
    expansesCodesLogic.deleteExpanseCode(id).then((result) => {
      event.sender.send("expanse-code-deleted", { data: result });
    }).catch((error) => {
      event.reply("expanse-code-deleted", { error: error.message });
    });
  });

}

module.exports = expansesCodesIpc;