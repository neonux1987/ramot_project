const { ipcMain } = require('electron');
const BudgetExecutionLogic = require('../../backend/logic/BudgetExecutionLogic');

const budgetExecutionIpc = (connection) => {

  //fetch month expanses data
  const budgetExecutionLogic = new BudgetExecutionLogic(connection);

  ipcMain.on('get-budget-execution-data', (event, arg) => {
    budgetExecutionLogic.getAllBudgetExecutions(arg).then((result) => {
      //let data = nestHydrationJS.nest(result, DEFINITION);
      event.sender.send("budget-execution-data", result);
    }).catch((err) => {
      throw err;
    });
  });

}

module.exports = budgetExecutionIpc;