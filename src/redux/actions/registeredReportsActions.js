import { ipcRenderer } from 'electron';
import { playSound, soundTypes } from '../../audioPlayer/audioPlayer';
import { toast } from 'react-toastify';

// TYPES
export const TYPES = {
  REGISTERED_REPORTS_REQUEST: "REGISTERED_REPORTS_REQUEST",
  REGISTERED_REPORTS_RECEIVE: "REGISTERED_REPORTS_RECEIVE",
  REGISTERED_REPORTS_FETCHING_FAILED: "REGISTERED_REPORTS_FETCHING_FAILED",
  REGISTERED_REPORTS_CLEANUP: "REGISTERED_REPORTS_CLEANUP"
}

/**
 * fetch month expanses
 * @param {*} params 
 */
export const fetchRegisteredReports = (params = Object) => {
  return dispatch => {
    return new Promise((resolve, reject) => {
      //let react know that the fetching is started
      dispatch(requestRegisteredReports(params.buildingName));

      //request request to backend to get the data
      ipcRenderer.send("get-registered-reports-grouped-by-year", params);
      //listen when the data comes back
      return ipcRenderer.once("registered-reports-grouped-by-year-data", (event, arg) => {
        if (arg.error) {
          //let react know that an erro occured while trying to fetch
          dispatch(fetchingFailed(arg.error));
          //send the error to the notification center
          toast.error(arg.error, {
            onOpen: () => playSound(soundTypes.error)
          });
          reject(arg.error);
        } else {
          //success store the data
          dispatch(receiveRegisteredReports(arg.data, params.buildingName));
          resolve(arg.data);
        }
      });
    });
  }
};

export const requestRegisteredReports = function (page) {
  return {
    type: TYPES.REGISTERED_REPORTS_REQUEST,
    page
  }
};

export const receiveRegisteredReports = function (data, page) {
  return {
    type: TYPES.REGISTERED_REPORTS_RECEIVE,
    data,
    page
  }
}

export const fetchingFailed = function (error) {
  return {
    type: TYPES.REGISTERED_REPORTS_FETCHING_FAILED,
    payload: error
  }
};

export const cleanupRegisteredReports = () => {
  return {
    type: TYPES.REGISTERED_REPORTS_CLEANUP
  }
}