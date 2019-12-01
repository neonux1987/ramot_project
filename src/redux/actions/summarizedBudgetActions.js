import { ipcRenderer } from 'electron';
import registeredYearsActions from './registeredYearsActions';
import { playSound, soundTypes } from '../../audioPlayer/audioPlayer';
import React from 'react';
import { toast } from 'react-toastify';
import ToastRender from '../../components/ToastRender/ToastRender';

const TOAST_AUTO_CLOSE = 3000;

// TYPES
export const TYPES = {
  REQUEST_SUMMARIZED_BUDGETS: "REQUEST_SUMMARIZED_BUDGETS",
  RECEIVE_SUMMARIZED_BUDGETS: "RECEIVE_SUMMARIZED_BUDGETS",
  SUMMARIZED_BUDGETS_FETCHING_FAILED: "SUMMARIZED_BUDGETS_FETCHING_FAILED",
  UPDATE_SUMMARIZED_BUDGET: "UPDATE_SUMMARIZED_BUDGET",
  ADD_SUMMARIZED_BUDGET: "ADD_SUMMARIZED_BUDGET",
  DELETE_SUMMARIZED_BUDGET: "DELETE_SUMMARIZED_BUDGET",
  INIT_SUMMARIZED_BUDGETS_STATE: "INIT_SUMMARIZED_BUDGETS_STATE",
  SUMMARIZED_BUDGETS_CLEANUP: "SUMMARIZED_BUDGETS_CLEANUP"
}

/**
 * fetch summarized budgets
 * @param {*} params 
 */
export const fetchSummarizedBudgets = (params = Object) => {
  return dispatch => {

    //let react know that the fetching is started
    dispatch(requestSummarizedBudgets(params.buildingName));

    //request request to backend to get the data
    ipcRenderer.send("get-summarized-budgets", params);
    //listen when the data comes back
    ipcRenderer.once("summarized-budgets", (event, arg) => {
      if (arg.error) {
        //let react know that an erro occured while trying to fetch
        dispatch(summarizedBudgetsFetchingFailed(arg.error, params.buildingName));
        //send the error to the notification center
        toast.error(arg.error, {
          onOpen: () => playSound(soundTypes.error)
        });
      } else {
        //and empty report should be generated.
        if (arg.data.data.length === 0) {
          //generate empty report
          generateEmptyReport(params, dispatch);
        } else {
          //success store the data
          dispatch(receiveSummarizedBudgets(arg.data, params.date, params.buildingName));
          //if there is no data, that means it's a new month and 
        }
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
  ipcRenderer.send("generate-empty-summarized-budget-report", params);
  return ipcRenderer.once("generated-empty-summarized-budget-data", (event, arg) => {
    if (arg.error) {
      playSound(soundTypes.error);
      //empty report process finished
      toast.update(toastId, {
        render: <ToastRender done={true} message={arg.error} />,
        type: toast.TYPE.ERROR,
        delay: 2000,
        autoClose: TOAST_AUTO_CLOSE,
        onClose: () => {
          //let react know that an erro occured while trying to fetch
          dispatch(summarizedBudgetsFetchingFailed(arg.error, params.buildingName));
        }
      });
    } else {
      //empty report process finished
      toast.update(toastId, {
        render: <ToastRender done={true} message={"דוח שנתי חדש נוצר בהצלחה."} />,
        type: toast.TYPE.SUCCESS,
        delay: 2000,
        autoClose: TOAST_AUTO_CLOSE,
        onClose: () => {
          //success store the data
          dispatch(receiveSummarizedBudgets(arg.data, params.date, params.buildingName));
          dispatch(registeredYearsActions.fetchRegisteredYears(params));
        }
      });
    }
  });
}

const requestSummarizedBudgets = function (buildingName) {
  return {
    type: TYPES.REQUEST_SUMMARIZED_BUDGETS,
    buildingName
  }
};

const receiveSummarizedBudgets = function (data, date, buildingName) {
  return {
    type: TYPES.RECEIVE_SUMMARIZED_BUDGETS,
    data,
    date,
    buildingName
  }
}

/**
 * init the state
 */
export const initSummzrizedBudgetsState = function (buildingName) {
  return dispatch => {
    return new Promise((resolve, reject) => {
      if (buildingName) {
        dispatch(setSummarizedBudgetsInitialState(buildingName));
        resolve();
      } else {
        reject("page canot be empty/undefined or null");
      }
    });
  };
};

const setSummarizedBudgetsInitialState = function (buildingName) {
  return dispatch => {
    dispatch({
      type: TYPES.INIT_SUMMARIZED_BUDGETS_STATE,
      buildingName
    });
  }
};

export const summarizedBudgetCleanup = function (buildingName) {
  return {
    type: TYPES.SUMMARIZED_BUDGETS_CLEANUP,
    buildingName
  }
}

const summarizedBudgetsFetchingFailed = function (error, buildingName) {
  return {
    type: TYPES.SUMMARIZED_BUDGETS_FETCHING_FAILED,
    payload: error,
    buildingName
  }
};