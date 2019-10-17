import { ipcRenderer } from 'electron';
import React from 'react';
import { playSound, soundTypes } from '../../audioPlayer/audioPlayer';
import { toast } from 'react-toastify';
import ToastRender from '../../components/ToastRender/ToastRender';

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
        toast.error(arg.error, {
          onOpen: () => playSound(soundTypes.error)
        });
      } else {
        //if there is no data, that means it's a new month and 
        //and empty report should be generated.
        if (arg.data.length === 0) {
          //show a notification that the generation of 
          generateEmptyReport(params, dispatch);
        }
        //success store the data
        dispatch(receiveBudgetExecutions(arg.data, params.buildingName));
      }
    });

  }
};

const generateEmptyReport = (params, dispatch) => {
  //empty report process started
  const toastId = toast.info(<ToastRender spinner={true} message={"מייצר דוח רבעוני חדש..."} />, {
    autoClose: false,
    onOpen: () => playSound(soundTypes.message)
  });
  //request request to backend to get the data
  ipcRenderer.send("generate-budget-execution-report", params);
  return ipcRenderer.once("generated-budget-execution-data", (event, arg) => {
    if (arg.error) {
      //let react know that an erro occured while trying to fetch
      dispatch(fetchingFailed(arg.error));
      //send the error to the notification center
      toast.error(arg.error, {
        onOpen: () => playSound(soundTypes.error)
      });
    } else {
      //success store the data
      dispatch(receiveBudgetExecutions(arg.data, params.buildingName));
      //send success message
      toast.success(<ToastRender done={true} message={"דוח רבעוני חדש נוצר בהצלחה."} />, {
        delay: 2000,
        autoClose: 3000,
        onOpen: () => {
          toast.dismiss(toastId);
          playSound(soundTypes.message)
        }
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
        //send the error to the notification center
        toast.error(arg.error, {
          onOpen: () => playSound(soundTypes.error)
        });
      } else {
        //success
        dispatch(receiveBudgetExecutions(tableData, params.buildingName));
        toast.success("השורה עודכנה בהצלחה.", {
          onOpen: () => playSound(soundTypes.message)
        });
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