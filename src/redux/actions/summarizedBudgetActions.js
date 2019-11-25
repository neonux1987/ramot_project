import { ipcRenderer } from 'electron';
import registeredYearsActions from './registeredYearsActions';
import { playSound, soundTypes } from '../../audioPlayer/audioPlayer';
import React from 'react';
import { toast } from 'react-toastify';
import ToastRender from '../../components/ToastRender/ToastRender';

const TOAST_AUTO_CLOSE = 3000;

/**
 * fetch summarized budgets
 * @param {*} params 
 */
const fetchSummarizedBudgets = (params = Object) => {
  return dispatch => {

    //let react know that the fetching is started
    dispatch(requestSummarizedBudgets(params.buildingName));

    //request request to backend to get the data
    ipcRenderer.send("get-summarized-budgets", params);
    //listen when the data comes back
    ipcRenderer.once("summarized-budgets", (event, arg) => {
      if (arg.error) {
        //let react know that an erro occured while trying to fetch
        dispatch(fetchingFailed(arg.error));
        //send the error to the notification center
        toast.error(arg.error, {
          onOpen: () => playSound(soundTypes.error)
        });
      } else {
        //and empty report should be generated.
        if (arg.data.length === 0) {
          //generate empty report
          generateEmptyReport(params, dispatch);
        } else {
          //success store the data
          dispatch(receiveSummarizedBudgets(arg.data, params.buildingName));
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
          dispatch(fetchingFailed(arg.error));
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
          dispatch(receiveSummarizedBudgets(arg.data, params.buildingName));
          dispatch(registeredYearsActions.fetchRegisteredYears(params));
        }
      });
    }
  });
}

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