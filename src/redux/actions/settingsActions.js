import { ipcRenderer } from 'electron';
import { notify, notificationTypes } from '../../components/Notifications/Notification';
import { playSound, soundTypes } from '../../audioPlayer/audioPlayer';

/**
 * fetch general settings
 * @param {*} params 
 */
const fetchSettings = () => {

  return dispatch => {

    //let react know that the fetching is started
    dispatch(requestSettings());

    //request request to backend to get the data
    ipcRenderer.send("get-settings");
    //listen when the data comes back
    ipcRenderer.once("settings-data", (event, arg) => {
      if (arg.error) {
        //let react know that an erro occured while trying to fetch
        dispatch(fetchingFailed(arg.error));
        //send the error to the notification center
        notify({
          isError: true,
          type: notificationTypes.db,
          message: arg.error
        });
      } else {
        //success store the data
        dispatch(receiveSettings(arg.data));
      }
    });
  }
};

const requestSettings = function () {
  return {
    type: "REQUEST_SETTINGS"
  }
};

const receiveSettings = function (data) {
  return {
    type: "RECEIVE_SETTINGS",
    data: data
  }
}

const fetchingFailed = function (error) {
  return {
    type: "FETCHING_FAILED",
    payload: error
  }
};

const updateSettingsInStore = function (name, data) {
  return {
    type: "UPDATE_SETTINGS",
    name,
    data
  }
};

/**
 * update general settings
 * @param {*} params 
 */
const onTimeChange = (key, data) => {
  return dispatch => {
    dispatch(updateSettingsInStore(key, data));
  }
};

/**
 * update general settings
 * @param {*} params 
 */
const updateSettings = (key, data) => {
  return dispatch => {
    //send a request to backend to get the data
    ipcRenderer.send("update-settings", key, data);
    //listen when the data comes back
    ipcRenderer.once("updated-settings", (event, arg) => {
      if (arg.error) {
        console.log(arg.error);
      } else {
        dispatch(updateSettingsInStore(key, data));
      }
    });
  }
};

export default {
  fetchSettings,
  updateSettings,
  fetchingFailed,
  receiveSettings,
  requestSettings,
  onTimeChange
};