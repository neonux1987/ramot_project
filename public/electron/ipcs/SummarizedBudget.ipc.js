const { ipcMain } = require('electron');
const SummarizedBudgetLogic = require('../../backend/logic/SummarizedBudgetLogic');

const summarizedBudgetIpc = (connection) => {

  //fetch month expanses data
  const summarizedBudgetLogic = new SummarizedBudgetLogic(connection);

  ipcMain.on('get-summarized-budget-data', (event, arg) => {
    summarizedBudgetLogic.getBuildingSummarizedBudget(arg).then((result) => {
      //let data = nestHydrationJS.nest(result, DEFINITION);
      event.sender.send("summarized-budget-data", result);
    }).catch((err) => {
      throw err;
    });
  });

}

module.exports = summarizedBudgetIpc;