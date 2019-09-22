import { ipcRenderer } from 'electron';
import dateActions from './dateActions';
import { notify, notificationTypes } from '../../components/Notifications/Notification';

/**
 * fetch summarized budgets
 * @param {*} params 
 */
const fetchSummarizedBudgets = (params = Object) => {
  return dispatch => {

    //let react know that the fetching is started
    dispatch(requestSummarizedBudgets(params.buildingName));

    //request request to backend to get the data
    ipcRenderer.send("get-summarized-budget-data", params);
    //listen when the data comes back
    ipcRenderer.once("summarized-budget-data", (event, arg) => {
      if (arg.error) {
        //let react know that an erro occured while trying to fetch
        dispatch(fetchingFailed(arg.error));
        //send the error to the notification center
        notify({
          isError: true,
          type: notificationTypes.db,
          message: arg.error
        });
      } else {
        //success store the data
        dispatch(receiveSummarizedBudgets(arg.data, params.buildingName));
        //update the date to he requested date in the params of the data
        dispatch(dateActions.updateDate(params.date));
      }
    });

  }
};

const requestSummarizedBudgets = function (page) {
  return {
    type: "REQUEST_SUMMARIZED_BUDGETS",
    page
  }
};

const receiveSummarizedBudgets = function (data, page) {
  return {
    type: "RECEIVE_SUMMARIZED_BUDGETS",
    data: data,
    page
  }
}

/**
 * init the state
 */
const initState = function (page) {
  return dispatch => {
    return new Promise((resolve, reject) => {
      if (page) {
        dispatch(setInitialState(page));
        resolve();
      } else {
        reject("page canot be empty/undefined or null");
      }
    });
  };
};

const setInitialState = function (page) {
  return dispatch => {
    dispatch({
      type: "INIT_STATE",
      page: page
    });
  }
};

const cleanup = function (buldingNameEng) {
  return {
    type: "CLEANUP",
    page: buldingNameEng
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
  requestSummarizedBudgets,
  initState,
  cleanup
};