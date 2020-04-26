import { ipcRenderer } from 'electron';
import registeredMonthsActions from './registeredMonthsActions';
import registeredYearsActions from './registeredYearsActions';
import React from 'react';
import { playSound, soundTypes } from '../../audioPlayer/audioPlayer';
import { toast } from 'react-toastify';
import ToastRender from '../../components/ToastRender/ToastRender';
import { ipcSendReceive } from './util/util';

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
  return async dispatch => {
    // let react know that the fetching is started
    dispatch(requestMonthExpanses(params.buildingName));

    return ipcSendReceive("get-month-expanses-data-by-range", params, "month-expanses-data-by-range")
      .then((result) => {

        // if there is no data, that means it's a new month and 
        // and empty report should be generated.
        if (result.data.data.length === 0) {
          // generate empty report
          //generateEmptyReport(params, dispatch);
          dispatch(receiveMonthExpanses([], params.buildingName));
        } else {
          // store the data
          dispatch(receiveMonthExpanses(result.data.data, params.buildingName));
        }

      })
      .catch((result) => {
        // let react know that an erro occured while trying to fetch
        dispatch(monthExpansesFetchingFailed(result.error, params.buildingName));
      });

  } // end return
};

const requestMonthExpanses = function (buildingName) {
  return {
    type: TYPES.MONTH_EXPANSES_REQUEST,
    buildingName
  }
};

const receiveMonthExpanses = function (data, buildingName) {
  return {
    type: TYPES.MONTH_EXPANSES_RECEIVE,
    data,
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
  return dispatch => {

    return new Promise((resolve, reject) => {

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

          reject(false);
        } else {
          //set the new id from the saved object in the db
          expanse.id = arg.data;

          //success store the data
          dispatch(addMonthExpanseInStore(expanse, params.buildingName, sortByCode));

          //send success notification
          toast.success("השורה נוספה בהצלחה.", {
            onOpen: () => playSound(soundTypes.message)
          });

          resolve(true);
        } // end else
      }); // end ipc renderer

    }); // end promise

  } // end annonymous method

}

const addMonthExpanseInStore = (payload, buildingName, sortByCode) => {
  return {
    type: TYPES.MONTH_EXPANSES_ADD,
    payload,
    buildingName,
    compareFunc: sortByCode
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

const updateMonthExpanseInStore = (buildingName, payload, index) => {
  return {
    type: TYPES.MONTH_EXPANSES_UPDATE,
    index,
    payload,
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

function sortByCode(a, b) {
  return a.code - b.code;
}