import { ipcRenderer } from 'electron';
import registeredMonthsActions from './registeredMonthsActions';
import registeredYearsActions from './registeredYearsActions';
import React from 'react';
import { playSound, soundTypes } from '../../audioPlayer/audioPlayer';
import { toast } from 'react-toastify';
import ToastRender from '../../components/ToastRender/ToastRender';

const TOAST_AUTO_CLOSE = 3000;

// TYPES
export const TYPES = {
  MONTH_EXPANSES_REQUEST: "MONTH_EXPANSES_REQUEST",
  MONTH_EXPANSES_RECEIVE: "MONTH_EXPANSES_RECEIVE",
  MONTH_EXPANSES_FETCHING_FAILED: "MONTH_EXPANSES_FETCHING_FAILED",
  MONTH_EXPANSES_UPDATE: "MONTH_EXPANSES_UPDATE",
  MONTH_EXPANSES_ADD: "MONTH_EXPANSES_ADD",
  MONTH_EXPANSES_DELETE: "MONTH_EXPANSES_DELETE",
  MONTH_EXPANSES_INIT_STATE: "MONTH_EXPANSES_INIT_STATE",
  MONTH_EXPANSES_CLEANUP: "MONTH_EXPANSES_CLEANUP"
}

/**
 * fetch month expanses
 * @param {*} params 
 */
export const fetchMonthExpanses = (params = Object) => {
  return dispatch => {
    // let react know that the fetching is started
    dispatch(requestMonthExpanses(params.buildingName));

    // request request to backend to get the data
    ipcRenderer.send("get-month-expanses-data-by-range", params);

    // listen when the data comes back
    return ipcRenderer.once("month-expanses-data-by-range", (event, arg) => {
      if (arg.error) {
        // let react know that an erro occured while trying to fetch
        dispatch(monthExpansesFetchingFailed(arg.error, params.buildingName));
        // send the error to the notification center
        toast.error(arg.error, {
          onOpen: () => playSound(soundTypes.error)
        });
      } else {
        // if there is no data, that means it's a new month and 
        // and empty report should be generated.
        if (arg.data.data.length === 0) {
          // generate empty report
          generateEmptyReport(params, dispatch);
        } else {
          // store the data
          dispatch(receiveMonthExpanses(arg.data, params.date, params.buildingName));
        }
      } // end else
    });
  } // end return
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
      }); // end toast
    } // end else
  });
}

const requestMonthExpanses = function (buildingName) {
  return {
    type: TYPES.MONTH_EXPANSES_REQUEST,
    buildingName
  }
};

const receiveMonthExpanses = function (data, date, buildingName) {
  return {
    type: TYPES.MONTH_EXPANSES_RECEIVE,
    data,
    date,
    buildingName
  }
}

export const initMonthExpansesState = function (buildingName) {
  return dispatch => {
    return new Promise((resolve, reject) => {
      if (buildingName) {
        dispatch(setMonthExpansesInitialState(buildingName));
        resolve();
      } else {
        reject("page cannot be empty/undefined or null");
      }
    });
  };
};

const setMonthExpansesInitialState = function (buildingName) {
  return dispatch => {
    dispatch({
      type: TYPES.MONTH_EXPANSES_INIT_STATE,
      buildingName
    });
  }
};

export const monthExpansesCleanup = function (buildingName) {
  return {
    type: TYPES.MONTH_EXPANSES_CLEANUP,
    buildingName
  }
}

const monthExpansesFetchingFailed = function (error, buildingName) {
  return {
    type: TYPES.MONTH_EXPANSES_FETCHING_FAILED,
    error,
    buildingName
  }
};

export const addMonthExpanse = (params = Object, expanse = Object) => {
  return (dispatch) => {

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
        //set the new id from the saved object in the db
        expanse.id = arg[0];
        //success store the data
        dispatch(addMonthExpanseInStore(expanse, params.buildingName));

        //send success notification
        toast.success("השורה נוספה בהצלחה.", {
          onOpen: () => playSound(soundTypes.message)
        });
      } // end else
    }); // end ipc renderer
  }
};

const addMonthExpanseInStore = (payload, buildingName) => {
  return {
    type: TYPES.MONTH_EXPANSES_ADD,
    payload,
    buildingName
  }
}

export const updateMonthExpanse = (params, oldExpanse, index) => {

  return dispatch => {
    // first update the store for fast user response
    dispatch(updateMonthExpanseInStore(params.buildingName, params.expanse, index));

    // send a request to backend to get the data
    ipcRenderer.send("update-month-expanse", params);

    // listen when the data comes back
    ipcRenderer.once("month-expanse-updated", (event, arg) => {
      if (arg.error) {
        // rollback to old expanse
        dispatch({
          type: TYPES.MONTH_EXPANSES_UPDATE,
          index,
          payload: oldExpanse,
          buildingName: params.buildingName
        });
        // send the error to the notification center
        toast.error(arg.error, {
          onOpen: () => playSound(soundTypes.error)
        });
      } else {
        // send success notification
        toast.success("השורה עודכנה בהצלחה.", {
          onOpen: () => playSound(soundTypes.message)
        });
      }
    });
  }
};

const updateMonthExpanseInStore = (buildingName, expanse, index) => {
  return {
    type: TYPES.MONTH_EXPANSES_UPDATE,
    index,
    payload: expanse,
    buildingName
  };
}

export const deleteMonthExpanse = (params = Object, index = Number) => {
  return dispatch => {
    // send a request to backend to get the data
    ipcRenderer.send("delete-month-expanse", params);

    ipcRenderer.once("month-expanse-deleted", (event, arg) => {
      if (arg.error) {
        //send the error to the notification center
        toast.error(arg.error, {
          onOpen: () => playSound(soundTypes.error)
        });
      } else {
        dispatch(deleteMonthExpanseInStore(index, params.buildingName));

        //send success notification
        toast.success("השורה נמחקה בהצלחה.", {
          onOpen: () => playSound(soundTypes.message)
        });
      }
    });
  }
};

export const deleteMonthExpansesBySummarizedSectionId = (buildingName, summarized_section_id, date) => {
  return dispatch => {
    // send a request to backend to get the data
    ipcRenderer.send("delete-month-expanses-by-summarized-section-id", { buildingName, summarized_section_id, date });

    ipcRenderer.once("month-expanses-by-summarized-section-id-deleted", (event, arg) => {
      if (arg.error) {
        //send the error to the notification center
        toast.error(arg.error, {
          onOpen: () => playSound(soundTypes.error)
        });
      } else {
        //dispatch(deleteMonthExpanseInStore(index, params.buildingName));

        //send success notification
        toast.success("השורה נמחקה בהצלחה.", {
          onOpen: () => playSound(soundTypes.message)
        });
      }
    });
  }
};

const deleteMonthExpanseInStore = (index, buildingName) => {
  return {
    type: TYPES.MONTH_EXPANSES_DELETE,
    index,
    buildingName
  }
}
