const { ipcMain } = require('electron');
const MonthExpansesLogic = require('../../backend/logic/MonthExpansesLogic');
const Transactions = require('../../backend/transactions/MonthExpansesTransactions');

const monthExpansesIpc = (connection) => {

  //fetch month expanses data
  const monthExpansesLogic = new MonthExpansesLogic(connection);
  //create transactions layer
  const transactions = new Transactions(connection);

  ipcMain.on('get-month-expanses-data', (event, arg) => {
    monthExpansesLogic.getAllMonthExpansesTrx(arg.buildingName, arg.date).then((result) => {
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
    transactions.addNewMonthExpanse(data).then((result) => {
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

  ipcMain.on('create-month-expanses-database-table', (event, data) => {
    monthExpansesLogic.deleteMonthExpanse(data).then((result) => {
      event.reply("month-expanses-database-table-created", { data: result });
    }).catch((error) => {
      event.reply("month-expanses-database-table-created", { error: error.message });
    });
  });

  ipcMain.on('generate-empty-month-expanses-report', (event, arg) => {
    transactions.createMonthEmptyExpanses(arg.buildingName, arg.date).then((result) => {
      //let data = nestHydrationJS.nest(result, DEFINITION);
      event.reply("generated-empty-month-expanses-data", { data: result });
    }).catch((error) => {
      event.reply("generated-empty-month-expanses-data", { error: error.message });
    });
  });

}

module.exports = monthExpansesIpc;