import { ipcRenderer } from 'electron';
import dateActions from './dateActions';
import { notify, notifyTimeless, notificationTypes } from '../../components/Notifications/Notification';
import { playSound, soundTypes } from '../../audioPlayer/audioPlayer';

/**
 * fetch month expanses
 * @param {*} params 
 */
const fetchBudgetExecutions = (params = Object) => {
  return dispatch => {

    //let react know that the fetching is started
    dispatch(requestBudgetExecutions(params.buildingName));

    //request request to backend to get the data
    ipcRenderer.send("get-budget-execution-data", params);
    //listen when the data comes back
    ipcRenderer.once("budget-execution-data", (event, arg) => {
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
        //if there is no data, that means it's a new month and 
        //and empty report should be generated.
        if (arg.data.length === 0) {
          //show a notification that the generation of 
          //the empty report has started
          notifyTimeless({
            isError: false,
            type: notificationTypes.message,
            message: "מייצר דוח חדש לחודש הנוכחי...",
            spinner: true
          });
          generateEmptyReport(params, dispatch);
        }
        //success store the data
        dispatch(receiveBudgetExecutions(arg.data, params.buildingName));
        //update the date to he requested date in the params of the data
        dispatch(dateActions.updateDate(params.date));
      }
    });

  }
};

const generateEmptyReport = (params, dispatch) => {
  //request request to backend to get the data
  ipcRenderer.send("generate-budget-execution-report", params);
  return ipcRenderer.once("generated-budget-execution-data", (event, arg) => {
    if (arg.error) {
      //let react know that an erro occured while trying to fetch
      dispatch(fetchingFailed(arg.error));
      //send the error to the notification center
      notify({
        isError: true,
        type: notificationTypes.db,
        message: arg.error
      });
      playSound(soundTypes.error);
    } else {
      //success store the data
      dispatch(receiveBudgetExecutions(arg.data, params.buildingName));
      //update the date to he requested date in the params of the data
      dispatch(dateActions.updateDate(params.date));
      notify({
        isError: false,
        type: notificationTypes.message,
        message: "הדוח לחודש החדש נוצר בהצלחה."
      });
    }
  });
}

const requestBudgetExecutions = function (page) {
  return {
    type: "REQUEST_BUDGET_EXECUTIONS",
    page
  }
};

const receiveBudgetExecutions = function (data, page) {
  return {
    type: "RECEIVE_BUDGET_EXECUTIONS",
    data: data,
    page
  }
}

const fetchingFailed = function (error) {
  return {
    type: "FETCHING_FAILED",
    payload: error
  }
};

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
      dispatch(receiveBudgetExecutions(tableData, params.buildingName));
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
    //send a request to backend to get the data
    ipcRenderer.send("update-budget-execution", params);
    //listen when the data comes back
    ipcRenderer.once("budget-execution-updated", (event, arg) => {
      if (arg.error) {
        notify({
          isError: true,
          type: notificationTypes.db,
          message: arg.error
        });
        playSound(soundTypes.error);
      } else {
        dispatch(receiveBudgetExecutions(tableData, params.buildingName));
        notify({
          type: notificationTypes.message,
          message: "השורה עודכנה בהצלחה."
        });
        playSound(soundTypes.message);
      }
    });
  };
};

export default {
  fetchBudgetExecutions,
  addBudgetExecution,
  updateBudgetExecution,
  fetchingFailed,
  receiveBudgetExecutions,
  requestBudgetExecutions,
  initState,
  cleanup
};