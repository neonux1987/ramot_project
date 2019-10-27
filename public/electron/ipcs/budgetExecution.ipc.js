const { ipcMain } = require('electron');
const BudgetExecutionLogic = require('../../backend/logic/BudgetExecutionLogic');

const budgetExecutionIpc = (connection) => {

  //fetch month expanses data
  const budgetExecutionLogic = new BudgetExecutionLogic(connection);

  ipcMain.on('get-budget-execution-data', (event, arg) => {
    budgetExecutionLogic.getAllBudgetExecutionsTrx(arg.buildingName, arg.date).then((result) => {
      event.sender.send("budget-execution-data", { data: result });
    }).catch((error) => {
      console.log(error);
      event.reply("budget-execution-data", { error: error.message });
    });
  });

  ipcMain.on('update-budget-execution', (event, arg) => {
    budgetExecutionLogic.updateBudgetExecutionTrx(arg).then((result) => {
      event.sender.send("budget-execution-updated", { data: result });
    }).catch((error) => {
      console.log(error);
      event.reply("budget-execution-updated", { error: error.message });
    });
  });

  ipcMain.on('generate-budget-execution-report', (event, arg) => {
    budgetExecutionLogic.createEmptyReport(arg.buildingName, arg.date).then((result) => {
      event.sender.send("generated-budget-execution-data", { data: result });
    }).catch((error) => {
      console.log(error);
      event.reply("generated-budget-execution-data", { error: error.message });
    });
  });

}

module.exports = budgetExecutionIpc;