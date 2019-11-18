import { ipcRenderer } from 'electron';
import registeredMonthsActions from './registeredMonthsActions';
import registeredYearsActions from './registeredYearsActions';
import React from 'react';
import { playSound, soundTypes } from '../../audioPlayer/audioPlayer';
import { toast } from 'react-toastify';
import ToastRender from '../../components/ToastRender/ToastRender';

const TOAST_AUTO_CLOSE = 3000;

// TYPES
export const REQUEST_MONTH_EXPANSES = "REQUEST_MONTH_EXPANSES";
export const RECEIVE_MONTH_EXPANSES = "RECEIVE_MONTH_EXPANSES";
export const MONTH_EXPANSES_FETCHING_FAILED = "MONTH_EXPANSES_FETCHING_FAILED";
export const UPDATE_MONTH_EXPANSE = "UPDATE_MONTH_EXPANSE";
export const ADD_MONTH_EXPANSE = "ADD_MONTH_EXPANSE";
export const DELETE_MONTH_EXPANSE = "DELETE_MONTH_EXPANSE";
export const INIT_MONTH_EXPANSES_STATE = "INIT_MONTH_EXPANSES_STATE";
export const MONTH_EXPANSES_CLEANUP = "MONTH_EXPANSES_CLEANUP";

/**
 * fetch month expanses
 * @param {*} params 
 */
export const fetchMonthExpanses = (params = Object) => {
  return dispatch => {

    //let react know that the fetching is started
    dispatch(requestMonthExpanses(params.buildingName));

    //request request to backend to get the data
    ipcRenderer.send("get-month-expanses-data-by-range", params);
    //listen when the data comes back
    return ipcRenderer.once("month-expanses-data-by-range", (event, arg) => {
      if (arg.error) {
        //let react know that an erro occured while trying to fetch
        dispatch(monthExpansesFetchingFailed(arg.error));
        //send the error to the notification center
        toast.error(arg.error, {
          onOpen: () => playSound(soundTypes.error)
        });
      } else {
        //if there is no data, that means it's a new month and 
        //and empty report should be generated.
        if (arg.data.length === 0) {
          //generate empty report
          generateEmptyReport(params, dispatch);
        } else {
          //success store the data
          dispatch(receiveMonthExpanses(arg.data, params.buildingName));
        }
      }
    });
  }
};

const generateEmptyReport = (params, dispatch) => {
  //empty report process started
  const toastId = toast.info(<ToastRender spinner={true} message={"מייצר דוח חודשי חדש..."} />, {
    autoClose: false,
    onOpen: () => playSound(soundTypes.message)
  });

  //request request to backend to get the data
  ipcRenderer.send("generate-empty-month-expanses-report", params);
  return ipcRenderer.once("generated-empty-month-expanses-data", (event, arg) => {
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
          dispatch(monthExpansesFetchingFailed(arg.error));
        }
      });
    } else {
      //empty report process finished
      toast.update(toastId, {
        render: <ToastRender done={true} message={"דוח חודש חדש נוצר בהצלחה."} />,
        type: toast.TYPE.SUCCESS,
        autoClose: TOAST_AUTO_CLOSE,
        delay: 2000,
        onClose: () => {
          //success store the data
          dispatch(receiveMonthExpanses(arg.data, params.buildingName));
          dispatch(registeredMonthsActions.fetchRegisteredMonths(params));
          dispatch(registeredYearsActions.fetchRegisteredYears(params));
        }
      });

    }
  });
}

const requestMonthExpanses = function (page) {
  return {
    type: REQUEST_MONTH_EXPANSES,
    page
  }
};

const receiveMonthExpanses = function (data, page) {
  return {
    type: RECEIVE_MONTH_EXPANSES,
    data,
    page
  }
}

/**
 * init the state
 */
export const initMonthExpansesState = function (page) {
  return dispatch => {
    return new Promise((resolve, reject) => {
      if (page) {
        dispatch(setMonthExpansesInitialState(page));
        resolve();
      } else {
        reject("page cannot be empty/undefined or null");
      }
    });
  };
};

const setMonthExpansesInitialState = function (page) {
  return dispatch => {
    dispatch({
      type: INIT_MONTH_EXPANSES_STATE,
      page: page
    });
  }
};

export const monthExpansesCleanup = function (buldingNameEng) {
  return {
    type: MONTH_EXPANSES_CLEANUP,
    page: buldingNameEng
  }
}

const monthExpansesFetchingFailed = function (error) {
  return {
    type: MONTH_EXPANSES_FETCHING_FAILED,
    payload: error
  }
};

/**
 * add expanse
 * @param {*} payload 
 * @param {*} tableData 
 */
export const addMonthExpanse = (params = Object, tableData, expanse) => {
  return dispatch => {
    //send a request to backend to get the data
    ipcRenderer.send("add-new-month-expanse", params);
    //listen when the data comes back
    ipcRenderer.once("month-expanse-added", (event, arg) => {
      if (arg.error) {
        //let react know that an erro occured while trying to fetch
        dispatch(monthExpansesFetchingFailed(arg.error));
        //send the error to the notification center
        toast.error(arg.error, {
          onOpen: () => playSound(soundTypes.error)
        });
        playSound(soundTypes.error);
      } else {
        expanse.id = arg[0];
        tableData.push(expanse);
        //success store the data
        dispatch(receiveMonthExpanses(tableData, params.buildingName));

        //send success notification
        toast.success("השורה נוספה בהצלחה.", {
          onOpen: () => playSound(soundTypes.message)
        });
      }
    });
  }
};

/**
 * update expanse
 * @param {*} payload 
 * @param {*} tableData 
 */
export const updateMonthExpanse = (params, oldExpanse, index) => {
  return dispatch => {
    //first update the store for fast user respond
    dispatch({
      type: UPDATE_MONTH_EXPANSE,
      payload: {
        index: index,
        expanse: params.expanse
      }
    });
    //send a request to backend to get the data
    ipcRenderer.send("update-month-expanse", params);
    //listen when the data comes back
    ipcRenderer.once("month-expanse-updated", (event, arg) => {
      if (arg.error) {
        // rollback to old expanse
        dispatch({
          type: UPDATE_MONTH_EXPANSE,
          payload: {
            index: index,
            expanse: oldExpanse
          }
        });

        //send the error to the notification center
        toast.error(arg.error, {
          onOpen: () => playSound(soundTypes.error)
        });
      } else {
        //send success notification
        toast.success("השורה עודכנה בהצלחה.", {
          onOpen: () => playSound(soundTypes.message)
        });
      }
    });
  }
};

/**
 * update expanse
 * @param {*} payload 
 * @param {*} tableData 
 */
export const deleteMonthExpanse = (params = Object, tableData = Array) => {
  return dispatch => {
    //send a request to backend to get the data
    ipcRenderer.send("delete-month-expanse", params);

    //listen when the data comes back
    ipcRenderer.once("month-expanse-deleted", (event, arg) => {
      if (arg.error) {
        //send the error to the notification center
        toast.error(arg.error, {
          onOpen: () => playSound(soundTypes.error)
        });
      } else {
        dispatch(receiveMonthExpanses(tableData, params.buildingName));

        //send success notification
        toast.success("השורה נמחקה בהצלחה.", {
          onOpen: () => playSound(soundTypes.message)
        });
      }
    });
  }
};