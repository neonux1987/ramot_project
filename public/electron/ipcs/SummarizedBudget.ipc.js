const { ipcMain } = require('electron');
const SummarizedBudgetLogic = require('../../backend/logic/SummarizedBudgetLogic');

const summarizedBudgetIpc = (connection) => {

  //fetch month expanses data
  const summarizedBudgetLogic = new SummarizedBudgetLogic(connection);

  ipcMain.on('get-summarized-budgets', (event, { buildingNameEng, date }) => {
    summarizedBudgetLogic.getBuildingSummarizedBudgetTrx(buildingNameEng, date).then((result) => {
      //let data = nestHydrationJS.nest(result, DEFINITION);
      event.sender.send("summarized-budgets", { data: result });
    }).catch((error) => {
      event.reply("summarized-budgets", { error: error.message });
    });
  });

  ipcMain.on('get-summarized-budgets-top-income-outcome', (event, { buildingNameEng, date, limit }) => {
    const { fromYear, toYear } = date;
    summarizedBudgetLogic.getSummarizedBudgetTopIncomeOutcome(buildingNameEng, fromYear, toYear, limit).then((result) => {
      //let data = nestHydrationJS.nest(result, DEFINITION);
      event.sender.send("summarized-budgets-top-income-outcome-data", { data: result });
    }).catch((error) => {
      event.reply("summarized-budgets-top-income-outcome-data", { error: error.message });
    });
  });

  ipcMain.on('get-summarized-budgets-by-range', (event, { buildingNameEng, date }) => {
    const { fromYear, toYear } = date;
    summarizedBudgetLogic.getSummarizedBudgetsByRange(buildingNameEng, fromYear, toYear).then((result) => {
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

  ipcMain.on('generate-empty-summarized-budget-report', (event, { buildingNameEng, date }) => {
    summarizedBudgetLogic.createEmptyReport(buildingNameEng, date).then((result) => {
      //let data = nestHydrationJS.nest(result, DEFINITION);
      event.reply("generated-empty-summarized-budget-data", { data: result });
    }).catch((error) => {
      event.reply("generated-empty-summarized-budget-data", { error: error.message });
    });
  });

}

module.exports = summarizedBudgetIpc;