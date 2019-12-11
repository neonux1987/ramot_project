import { ipcRenderer } from 'electron';
import { playSound, soundTypes } from '../../audioPlayer/audioPlayer';
import { toast } from 'react-toastify';

export const REQUEST_TABLE_SETTINGS = "REQUEST_TABLE_SETTINGS";
export const RECEIVE_TABLE_SETTINGS = "RECEIVE_TABLE_SETTINGS";
export const TABLE_SETTINGS_FETCHING_FAILED = "TABLE_SETTINGS_FETCHING_FAILED";
export const UPDATE_TABLE_SETTINGS = "UPDATE_TABLE_SETTINGS";
export const TABLE_SETTINGS_CLEANUP = "UPDATE_TABLE_SETTINGS";
export const SET_START_ELEMENT = "SET_START_ELEMENT";
export const INIT_TABLE_SETTINGS = "INIT_TABLE_SETTINGS";

export const fetchTableSettings = (pageName) => {
  return dispatch => {
    return new Promise((resolve, reject) => {
      //let react know that the fetching is started
      dispatch(requestTableSettings(pageName));

      //request request to backend to get the data
      ipcRenderer.send("get-table-settings", pageName);
      //listen when the data comes back
      return ipcRenderer.once("table-settings", (event, arg) => {
        if (arg.error) {
          //let react know that an erro occured while trying to fetch
          dispatch(tableSettingsFetchingFailed(arg.error));
          //send the error to the notification center
          toast.error(arg.error, {
            onOpen: () => playSound(soundTypes.error)
          });
          reject(arg.error);
        } else {
          //success store the data
          dispatch(receiveTableSettings(pageName, arg.data));
          resolve(arg.data);
        }
      });
    }); // end Promise
  } // end dispatch function
};

export const updateTableSettings = (pageName, settings) => {
  return dispatch => {

    // write update in store first logic here

    //request request to backend to get the data
    ipcRenderer.send("update-table-settings", { pageName, settings });
    //listen when the data comes back
    return ipcRenderer.once("updated-table-settings", (event, arg) => {
      if (arg.error) {
        //send the error to the notification center
        toast.error(arg.error, {
          onOpen: () => playSound(soundTypes.error)
        });
      } else {
        //success store the data
        dispatch(receiveTableSettings(pageName, arg.data));
      }
    });
  }
};

export const updateTableSettingsStore = (pageName, data) => {
  return dispatch => {
    dispatch({
      type: UPDATE_TABLE_SETTINGS,
      pageName,
      data
    });
  }
}

export const setStartElement = (pageName, value) => {
  return dispatch => {
    dispatch({
      type: SET_START_ELEMENT,
      value
    });
  }
}

const requestTableSettings = function (pageName) {
  return {
    type: REQUEST_TABLE_SETTINGS,
    pageName
  }
};

const receiveTableSettings = function (pageName, settings) {
  return {
    type: RECEIVE_TABLE_SETTINGS,
    pageName,
    settings
  }
}

const tableSettingsFetchingFailed = function (error) {
  return {
    type: TABLE_SETTINGS_FETCHING_FAILED,
    payload: error
  }
};

export const tableSettingsCleanup = (pageName) => {
  return {
    type: TABLE_SETTINGS_CLEANUP,
    pageName
  }
}

export const initTableSettings = (pageName) => {
  return dispatch => {
    return new Promise((resolve, reject) => {
      if (pageName) {
        dispatch({
          type: INIT_TABLE_SETTINGS,
          pageName
        });
        resolve();
      } else {
        reject("pageName cannot be empty/undefined or null");
      }
    });
  }
}