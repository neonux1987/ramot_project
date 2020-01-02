import { ipcRenderer } from 'electron';
import { playSound, soundTypes } from '../../audioPlayer/audioPlayer';
import { toast } from 'react-toastify';

/**
 * fetch month expanses
 * @param {*} params 
 */
const fetchRegisteredYears = (params = Object) => {
  return dispatch => {

    return new Promise((resolve, reject) => {
      //let react know that the fetching is started
      dispatch(requestRegisteredYears(params.buildingName));

      //request request to backend to get the data
      ipcRenderer.send("get-registered-years", params);
      //listen when the data comes back
      return ipcRenderer.once("registered-years-data", (event, arg) => {
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
          dispatch(receiveRegisteredYears(arg.data, params.buildingName));
          resolve(arg.data);
        }
      });
    })

  }
};

const requestRegisteredYears = function (page) {
  return {
    type: "REQUEST_REGISTERED_YEARS",
    page
  }
};

const receiveRegisteredYears = function (data, page) {
  return {
    type: "RECEIVE_REGISTERED_YEARS",
    data,
    page
  }
}

const fetchingFailed = function (error) {
  return {
    type: "REGISTERED_YEARS_FETCHING_FAILED",
    payload: error
  }
};

const cleanupYears = () => {
  return {
    type: "CLEANUP_YEARS"
  }
}

export default {
  fetchRegisteredYears,
  fetchingFailed,
  receiveRegisteredYears,
  requestRegisteredYears,
  cleanupYears
};