const { ipcMain } = require('electron');
const BudgetExecutionLogic = require('../../backend/logic/BudgetExecutionLogic');

const budgetExecutionIpc = (connection) => {

  //fetch month expanses data
  const budgetExecutionLogic = new BudgetExecutionLogic(connection);

  ipcMain.on('get-budget-execution-data', (event, arg) => {
    budgetExecutionLogic.getAllBudgetExecutions(arg).then((result) => {
      event.sender.send("budget-execution-data", { data: result });
    }).catch((err) => {
      event.reply("budget-execution-data", { error: error.message });
    });
  });

}

module.exports = budgetExecutionIpc;