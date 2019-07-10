import { ipcRenderer } from 'electron';
import dateActions from './dateActions';

/**
 * fetch summarized budgets
 * @param {*} params 
 */
const fetchSummarizedBudgets = (params = Object) => {
  return dispatch => {

    //let react know that the fetching is started
    dispatch(requestSummarizedBudgets());

    //request request to backend to get the data
    ipcRenderer.send("get-summarized-budget-data", params);
    //listen when the data comes back
    ipcRenderer.once("summarized-budget-data", (event, arg) => {
      if (arg.error) {
        //let react know that an erro occured while trying to fetch
        dispatch(fetchingFailed(arg.error));
      } else {
        //success store the data
        dispatch(receiveSummarizedBudgets(arg.data));
        //update the date to he requested date in the params of the data
        dispatch(dateActions.updateDate(params.date));
      }
    });

  }
};

const requestSummarizedBudgets = function () {
  return {
    type: "REQUEST_SUMMARIZED_BUDGETS"
  }
};

const receiveSummarizedBudgets = function (data) {
  return {
    type: "RECEIVE_SUMMARIZED_BUDGETS",
    data: data
  }
}

const fetchingFailed = function (error) {
  return {
    type: "FETCHING_FAILED",
    payload: error
  }
};

export default {
  fetchSummarizedBudgets,
  fetchingFailed,
  receiveSummarizedBudgets,
  requestSummarizedBudgets
};