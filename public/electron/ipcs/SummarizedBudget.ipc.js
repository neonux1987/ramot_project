const { ipcMain } = require('electron');
const SummarizedBudgetLogic = require('../../backend/logic/SummarizedBudgetLogic');
const Transactions = require('../../backend/transactions/SummarizedBudgetTransactions');

const summarizedBudgetIpc = (connection) => {

  //fetch month expanses data
  const summarizedBudgetLogic = new SummarizedBudgetLogic(connection);
  //create transactions layer
  const transactions = new Transactions(connection);

  ipcMain.on('get-summarized-budget-data', (event, arg) => {
    summarizedBudgetLogic.getBuildingSummarizedBudgetOrderedTrx(arg.buildingName, arg.date, undefined).then((result) => {
      //let data = nestHydrationJS.nest(result, DEFINITION);
      event.sender.send("summarized-budget-data", { data: result });
    }).catch((error) => {
      event.reply("summarized-budget-data", { error: error.message });
    });
  });

  ipcMain.on('generate-empty-summarized-budget-report', (event, arg) => {
    transactions.createEmptySummarizedBudget(arg.buildingName, arg.date).then((result) => {
      //let data = nestHydrationJS.nest(result, DEFINITION);
      event.reply("generated-empty-summarized-budget-data", { data: result });
    }).catch((error) => {
      event.reply("generated-empty-summarized-budget-data", { error: error.message });
    });
  });

}

module.exports = summarizedBudgetIpc;