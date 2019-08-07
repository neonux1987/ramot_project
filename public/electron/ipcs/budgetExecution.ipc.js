const { ipcMain } = require('electron');
const BudgetExecutionLogic = require('../../backend/logic/BudgetExecutionLogic');
const Transactions = require('../../backend/logic/transactions/Transactions');

const budgetExecutionIpc = (connection) => {

  //fetch month expanses data
  const budgetExecutionLogic = new BudgetExecutionLogic(connection);
  //create transactions layer
  const transactions = new Transactions(connection);

  ipcMain.on('get-budget-execution-data', (event, arg) => {
    budgetExecutionLogic.getAllBudgetExecutions(arg).then((result) => {
      event.sender.send("budget-execution-data", { data: result });
    }).catch((error) => {
      event.reply("budget-execution-data", { error: error.message });
    });
  });

  ipcMain.on('update-budget-execution', (event, arg) => {
    transactions.updateBudgetExecution(arg).then((result) => {
      event.sender.send("budget-execution-updated", { data: result });
    }).catch((error) => {
      event.reply("budget-execution-updated", { error: error.message });
    });
  });

}

module.exports = budgetExecutionIpc;