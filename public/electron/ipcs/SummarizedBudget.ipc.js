const { ipcMain } = require('electron');
const SummarizedBudgetLogic = require('../../backend/logic/SummarizedBudgetLogic');

const summarizedBudgetIpc = (connection) => {

  //fetch month expanses data
  const summarizedBudgetLogic = new SummarizedBudgetLogic(connection);

  ipcMain.on('get-summarized-budget-data', (event, arg) => {
    summarizedBudgetLogic.getBuildingSummarizedBudgetTrx(arg.buildingName, arg.date, undefined).then((result) => {
      //let data = nestHydrationJS.nest(result, DEFINITION);
      event.sender.send("summarized-budget-data", { data: result });
    }).catch((error) => {
      console.log(error);
      event.reply("summarized-budget-data", { error: error.message });
    });
  });

  ipcMain.on('generate-empty-summarized-budget-report', (event, arg) => {
    summarizedBudgetLogic.createEmptyReport(arg.buildingName, arg.date).then((result) => {
      //let data = nestHydrationJS.nest(result, DEFINITION);
      event.reply("generated-empty-summarized-budget-data", { data: result });
    }).catch((error) => {
      console.log(error);
      event.reply("generated-empty-summarized-budget-data", { error: error.message });
    });
  });

}

module.exports = summarizedBudgetIpc;