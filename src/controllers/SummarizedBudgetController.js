import { ipcRenderer } from 'electron';

class SummarizedBudgetController {

  getBuildingSummarizedBudget(params, callback) {
    //request month expanses data
    ipcRenderer.send("get-summarized-budget-data", params);
    ipcRenderer.once("summarized-budget-data", (event, result) => {
      callback(result);
    });
  }

}

export default SummarizedBudgetController;