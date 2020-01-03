const { ipcMain } = require('electron');
const SummarizedBudgetLogic = require('../../backend/logic/SummarizedBudgetLogic');

const summarizedBudgetIpc = (connection) => {

  //fetch month expanses data
  const summarizedBudgetLogic = new SummarizedBudgetLogic(connection);

  ipcMain.on('get-summarized-budgets', (event, params) => {
    summarizedBudgetLogic.getSummarizedBudgetsByRange(params.buildingName, params.date, params.range).then((result) => {
      //let data = nestHydrationJS.nest(result, DEFINITION);
      event.sender.send("summarized-budgets", { data: result });
    }).catch((error) => {
      console.log(error);
      event.reply("summarized-budgets", { error: error.message });
    });
  });

  ipcMain.on('update-summarized-budget', (event, params) => {
    summarizedBudgetLogic.updateSummarizedBudgetTrx(params).then((result) => {
      //let data = nestHydrationJS.nest(result, DEFINITION);
      event.sender.send("summarized-budget-updated", { data: result });
    }).catch((error) => {
      console.log(error);
      event.reply("summarized-budget-updated", { error: error.message });
    });
  });

  ipcMain.on('generate-empty-summarized-budget-report', (event, params) => {
    summarizedBudgetLogic.createEmptyReport(params.buildingName, params.date).then((result) => {
      //let data = nestHydrationJS.nest(result, DEFINITION);
      event.reply("generated-empty-summarized-budget-data", { data: result });
    }).catch((error) => {
      console.log(error);
      event.reply("generated-empty-summarized-budget-data", { error: error.message });
    });
  });

}

module.exports = summarizedBudgetIpc;