import { ipcRenderer } from 'electron';

class BudgetExecutionController {

  getAllBudgetExecutions(params, callback) {
    //request month expanses data
    ipcRenderer.send("get-budget-execution-data", params);
    ipcRenderer.once("budget-execution-data", (event, arg) => {
      callback(arg.data);
    });
  }



}

export default BudgetExecutionController;