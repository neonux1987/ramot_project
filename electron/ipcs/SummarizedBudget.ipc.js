const { ipcMain } = require('electron');
const SummarizedBudgetLogic = require('../backend/logic/SummarizedBudgetLogic');

const summarizedBudgetIpc = (connection) => {

  //fetch month expanses data
  const summarizedBudgetLogic = new SummarizedBudgetLogic(connection);

  ipcMain.on('get-summarized-budgets', (event, { buildingId, date }) => {
    summarizedBudgetLogic.getBuildingSummarizedBudgetTrx(buildingId, date).then((result) => {
      //let data = nestHydrationJS.nest(result, DEFINITION);
      event.sender.send("summarized-budgets", { data: result });
    }).catch((error) => {
      event.reply("summarized-budgets", { error: error.message });
    });
  });

  ipcMain.on('get-summarized-budgets-top-income-outcome', (event, { buildingId, date, limit }) => {
    const { fromYear, toYear } = date;
    summarizedBudgetLogic.getSummarizedBudgetTopIncomeOutcome(buildingId, fromYear, toYear, limit).then((result) => {
      //let data = nestHydrationJS.nest(result, DEFINITION);
      event.sender.send("summarized-budgets-top-income-outcome-data", { data: result });
    }).catch((error) => {
      event.reply("summarized-budgets-top-income-outcome-data", { error: error.message });
    });
  });

  ipcMain.on('get-summarized-budgets-by-range', (event, { buildingId, date }) => {
    const { fromYear, toYear } = date;
    summarizedBudgetLogic.getSummarizedBudgetsByRange(buildingId, fromYear, toYear).then((result) => {
      //let data = nestHydrationJS.nest(result, DEFINITION);
      event.sender.send("summarized-budgets-by-range-data", { data: result });
    }).catch((error) => {
      event.reply("summarized-budgets-by-range-data", { error: error.message });
    });
  });

  ipcMain.on('update-summarized-budget', (event, params) => {
    summarizedBudgetLogic.updateSummarizedBudgetTrx(params).then((result) => {
      //let data = nestHydrationJS.nest(result, DEFINITION);
      event.sender.send("summarized-budget-updated", { data: result });
    }).catch((error) => {
      event.reply("summarized-budget-updated", { error: error.message });
    });
  });

  ipcMain.on('generate-empty-summarized-budget-report', (event, { buildingId, date }) => {
    summarizedBudgetLogic.createEmptyReport(buildingId, date).then((result) => {
      //let data = nestHydrationJS.nest(result, DEFINITION);
      event.reply("generated-empty-summarized-budget-data", { data: result });
    }).catch((error) => {
      event.reply("generated-empty-summarized-budget-data", { error: error.message });
    });
  });

}

module.exports = summarizedBudgetIpc;