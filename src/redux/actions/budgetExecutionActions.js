import { ipcRenderer } from 'electron';
import dateActions from './dateActions';

/**
 * fetch month expanses
 * @param {*} params 
 */
const fetchBudgetExecutions = (params = Object) => {
  return dispatch => {

    //let react know that the fetching is started
    dispatch(requestBudgetExecutions());

    //request request to backend to get the data
    ipcRenderer.send("get-budget-execution-data", params);
    //listen when the data comes back
    ipcRenderer.once("budget-execution-data", (event, arg) => {
      if (arg.error) {
        //let react know that an erro occured while trying to fetch
        dispatch(fetchingFailed(arg.error));
      } else {
        //success store the data
        dispatch(receiveBudgetExecutions(arg.data));
        //update the date to he requested date in the params of the data
        dispatch(dateActions.updateDate(params.date));
      }
    });

  }
};

const requestBudgetExecutions = function () {
  return {
    type: "REQUEST_BUDGET_EXECUTIONS"
  }
};

const receiveBudgetExecutions = function (data) {
  return {
    type: "RECEIVE_BUDGET_EXECUTIONS",
    data: data
  }
}

const fetchingFailed = function (error) {
  return {
    type: "FETCHING_FAILED",
    payload: error
  }
};

/**
 * add budget execution
 * @param {*} params 
 * @param {*} tableData 
 */
const addBudgetExecution = (params = Object, tableData) => {
  return dispatch => {
    //send a request to backend to get the data
    ipcRenderer.send("add-new-month-expanse", params);
    //listen when the data comes back
    ipcRenderer.once("month-expanse-added", () => {
      dispatch(receiveBudgetExecutions(tableData));
    });
  }
};

/**
 * update budget execution
 * @param {*} payload 
 * @param {*} tableData 
 */
const updateBudgetExecution = (params = Object, tableData = Array) => {
  return dispatch => {
    /* //send a request to backend to get the data
    ipcRenderer.send("update-budget-execution", params);
    //listen when the data comes back
    ipcRenderer.once("month-expanse-updated", (event, arg) => {
      if (arg.error) {
        console.log(arg.error);
      } else {
        
      }
    }); */

    dispatch(receiveBudgetExecutions(tableData));
  }
};

export default {
  fetchBudgetExecutions,
  addBudgetExecution,
  updateBudgetExecution,
  fetchingFailed,
  receiveBudgetExecutions,
  requestBudgetExecutions
};