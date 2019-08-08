const { ipcMain } = require('electron');
const MonthExpansesLogic = require('../../backend/logic/MonthExpansesLogic');
const Transactions = require('../../backend/transactions/MonthExpansesTransactions');

const monthExpansesIpc = (connection) => {

  //fetch month expanses data
  const monthExpansesLogic = new MonthExpansesLogic(connection);
  //create transactions layer
  const transactions = new Transactions(connection);

  ipcMain.on('get-month-expanses-data', (event, arg) => {
    monthExpansesLogic.getAllMonthExpanses(arg).then((result) => {
      //let data = nestHydrationJS.nest(result, DEFINITION);
      event.reply("month-expanses-data", { data: result });
    }).catch((error) => {
      event.reply("month-expanses-data", { error: error.message });
    });
  });

  ipcMain.on('update-month-expanse', (event, data) => {
    transactions.updateMonthExpanse(data).then((result) => {
      event.reply("month-expanse-updated", { data: result });
    }).catch((error) => {
      event.reply("month-expanse-updated", { error: error.message });
    });
  });

  ipcMain.on('add-new-month-expanse', (event, data) => {
    monthExpansesLogic.addNewMonthExpanse(data).then((result) => {
      event.reply("month-expanse-added", result);
    }).catch((err) => {
      console.log(err)
    });

  });

  ipcMain.on('delete-month-expanse', (event, data) => {
    monthExpansesLogic.deleteMonthExpanse(data).then((result) => {
      event.reply("month-expanse-deleted", { data: result });
    }).catch((error) => {
      event.reply("month-expanse-deleted", { error: error.message });
    });
  });

}

module.exports = monthExpansesIpc;