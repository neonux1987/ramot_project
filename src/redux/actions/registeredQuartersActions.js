import { ipcRenderer } from 'electron';
import { playSound, soundTypes } from '../../audioPlayer/audioPlayer';
import { toast } from 'react-toastify';

/**
 * fetch month expanses
 * @param {*} params 
 */
const fetchRegisteredQuarters = (params = Object) => {
  return dispatch => {
    return new Promise((resolve, reject) => {
      //let react know that the fetching is started
      dispatch(requestRegisteredQuarters(params.buildingName));

      //request request to backend to get the data
      ipcRenderer.send("get-registered-quarters", params);
      //listen when the data comes back
      return ipcRenderer.once("registered-quarters-data", (event, arg) => {
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
          dispatch(receiveRegisteredQuarters(arg.data, params.buildingName));
          resolve(arg.data);
        }
      });
    });
  }
};

const requestRegisteredQuarters = function (page) {
  return {
    type: "REQUEST_REGISTERED_QUARTERS",
    page
  }
};

const receiveRegisteredQuarters = function (data, page) {
  return {
    type: "RECEIVE_REGISTERED_QUARTERS",
    data,
    page
  }
}

const fetchingFailed = function (error) {
  return {
    type: "REGISTERED_QUARTERS_FETCHING_FAILED",
    payload: error
  }
};

const cleanupQuarters = () => {
  return {
    type: "CLEANUP_QUARTERS"
  }
}

export default {
  fetchRegisteredQuarters,
  fetchingFailed,
  receiveRegisteredQuarters,
  requestRegisteredQuarters,
  cleanupQuarters
};