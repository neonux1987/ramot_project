const { ipcMain } = require('electron');
const BudgetExecutionLogic = require('../../backend/logic/BudgetExecutionLogic');

const budgetExecutionIpc = () => {

  //fetch month expanses data
  const budgetExecutionLogic = new BudgetExecutionLogic();

  ipcMain.on('get-budget-executions', (event, { buildingInfo, date }) => {
    budgetExecutionLogic.getAllBudgetExecutionsTrx(buildingInfo.buildingNameEng, date).then((result) => {
      event.sender.send("budget-executions", { data: result });
    }).catch((error) => {
      event.reply("budget-executions", { error: error.message });
    });
  });

  ipcMain.on('update-budget-execution', (event, params) => {
    budgetExecutionLogic.updateBudgetExecutionTrx(params).then((result) => {
      event.sender.send("budget-execution-updated", { data: result });
    }).catch((error) => {
      event.reply("budget-execution-updated", { error: error.message });
    });
  });

  ipcMain.on('add-budget-execution', (event, params) => {
    budgetExecutionLogic.addBudgetExecutionTrx(params).then((result) => {
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

  ipcMain.on('generate-budget-execution-report', (event, params) => {
    budgetExecutionLogic.createEmptyReport(params.buildingName, params.date).then((result) => {
      event.sender.send("generated-budget-execution-data", { data: result });
    }).catch((error) => {
      event.reply("generated-budget-execution-data", { error: error.message });
    });
  });

}

module.exports = budgetExecutionIpc;