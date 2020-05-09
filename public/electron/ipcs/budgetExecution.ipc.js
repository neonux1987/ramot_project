const { ipcMain } = require('electron');
const BudgetExecutionLogic = require('../../backend/logic/BudgetExecutionLogic');

const budgetExecutionIpc = (connection) => {

  //fetch month expanses data
  const budgetExecutionLogic = new BudgetExecutionLogic(connection);

  ipcMain.on('get-budget-executions', (event, arg) => {
    budgetExecutionLogic.getBudgetExecutionsByRange(arg.buildingName, arg.date, arg.range).then((result) => {
      event.sender.send("budget-executions", { data: result });
    }).catch((error) => {
      event.reply("budget-executions", { error: error.message });
    });
  });

  ipcMain.on('update-budget-execution', (event, arg) => {
    budgetExecutionLogic.updateBudgetExecutionTrx(arg).then((result) => {
      event.sender.send("budget-execution-updated", { data: result });
    }).catch((error) => {
      event.reply("budget-execution-updated", { error: error.message });
    });
  });

  ipcMain.on('add-budget-execution', (event, arg) => {
    budgetExecutionLogic.addBudgetExecutionTrx(arg).then((result) => {
      event.sender.send("budget-execution-added", { data: result });
    }).catch((error) => {
      event.reply("budget-execution-added", { error: error.message });
    });
  });

  ipcMain.on('delete-budget-execution', (event, params) => {
    budgetExecutionLogic.deleteBudgetExecution(params).then((result) => {
      event.sender.send("budget-execution-deleted", { data: result });
    }).catch((error) => {
      event.reply("budget-execution-deleted", { error: error.message });
    });
  });

  ipcMain.on('generate-budget-execution-report', (event, arg) => {
    budgetExecutionLogic.createEmptyReport(arg.buildingName, arg.date).then((result) => {
      event.sender.send("generated-budget-execution-data", { data: result });
    }).catch((error) => {
      event.reply("generated-budget-execution-data", { error: error.message });
    });
  });

}

module.exports = budgetExecutionIpc;