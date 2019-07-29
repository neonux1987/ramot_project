import { ipcRenderer } from 'electron';
import { notify, notificationTypes } from '../../components/Notifications/Notification';

/**
 * fetch general settings
 * @param {*} params 
 */
const fetchGeneralSettings = () => {

  return dispatch => {

    //let react know that the fetching is started
    dispatch(requestGeneralSettings());

    //request request to backend to get the data
    ipcRenderer.send("get-general-settings");
    //listen when the data comes back
    ipcRenderer.once("general-settings-data", (event, arg) => {
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
        dispatch(receiveGeneralSettings(arg.data));
      }
    });
  }
};

const requestGeneralSettings = function () {
  return {
    type: "REQUEST_GENERAL_SETTINGS"
  }
};

const receiveGeneralSettings = function (data) {
  return {
    type: "RECEIVE_GENERAL_SETTINGS",
    data: data
  }
}

const fetchingFailed = function (error) {
  return {
    type: "FETCHING_FAILED",
    payload: error
  }
};

/**
 * update general settings
 * @param {*} params 
 */
const updateGeneralSettings = (params = Object, tableData) => {
  return dispatch => {
    //send a request to backend to get the data
    ipcRenderer.send("update-general-settings", params);
    //listen when the data comes back
    ipcRenderer.once("updated-general-settings", (event, arg) => {
      if (arg.error) {
        console.log(arg.error);
      } else {
        dispatch(receiveGeneralSettings(tableData));
      }
    });
  }
};

export default {
  fetchGeneralSettings,
  updateGeneralSettings,
  fetchingFailed,
  receiveGeneralSettings,
  requestGeneralSettings
};