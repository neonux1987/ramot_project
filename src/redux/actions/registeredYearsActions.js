import { ipcRenderer } from 'electron';
import { notify, notificationTypes } from '../../components/Notifications/Notification';
import { playSound, soundTypes } from '../../audioPlayer/audioPlayer';

/**
 * fetch month expanses
 * @param {*} params 
 */
const fetchRegisteredYears = (params = Object) => {
  return dispatch => {

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
        notify({
          isError: true,
          type: notificationTypes.db,
          message: arg.error
        });
        playSound(soundTypes.error);
      } else {
        //success store the data
        dispatch(receiveRegisteredYears(arg.data, params.buildingName));
      }
    });
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
    type: "FETCHING_FAILED",
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