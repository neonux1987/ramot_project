import { ipcRenderer } from 'electron';
import { notify, notificationTypes } from '../../components/Notifications/Notification';
import { playSound, soundTypes } from '../../audioPlayer/audioPlayer';

/**
 * fetch month expanses
 * @param {*} params 
 */
const fetchRegisteredMonths = (params = Object) => {
  return dispatch => {

    //let react know that the fetching is started
    dispatch(requestRegisteredMonths(params.buildingName));

    //request request to backend to get the data
    ipcRenderer.send("get-registered-months", params);
    //listen when the data comes back
    return ipcRenderer.once("registered-months-data", (event, arg) => {
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
        dispatch(receiveRegisteredMonths(arg.data, params.buildingName));
      }
    });
  }
};

const requestRegisteredMonths = function (page) {
  return {
    type: "REQUEST_REGISTERED_MONTHS",
    page
  }
};

const receiveRegisteredMonths = function (data, page) {
  return {
    type: "RECEIVE_REGISTERED_MONTHS",
    data,
    page
  }
}

const fetchingFailed = function (error) {
  return {
    type: "FETCHING_FAILED",
    payload: error
  }
};

const cleanupMonths = () => {
  return {
    type: "CLEANUP_MONTHS"
  }
}

export default {
  fetchRegisteredMonths,
  fetchingFailed,
  receiveRegisteredMonths,
  requestRegisteredMonths,
  cleanupMonths
};