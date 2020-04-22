import { ipcRenderer } from 'electron';
import React from 'react';
import { playSound, soundTypes } from '../../audioPlayer/audioPlayer';
import { toast } from 'react-toastify';
import ToastRender from '../../components/ToastRender/ToastRender';

import { restartService } from './servicesActions';

// TYPES
export const TYPES = {
  SETTINGS_REQUEST: "SETTINGS_REQUEST",
  SETTINGS_RECEIVE: "SETTINGS_RECEIVE",
  SETTINGS_FETCHING_FAILED: "SETTINGS_FETCHING_FAILED",
  SETTINGS_UPDATE: "SETTINGS_UPDATE",
  SETTINGS_DB_BACKUP_UPDATE: "SETTINGS_DB_BACKUP_UPDATE",
  SETTINGS_CLEANUP: "SETTINGSS_CLEANUP"
}

export const fetchSettings = (settingName) => {
  return dispatch => {
    return new Promise((resolve, reject) => {
      //let react know that the fetching is started
      dispatch(requestSettings(settingName));

      //request request to backend to get the data
      ipcRenderer.send("get-specific-setting", settingName);
      //listen when the data comes back
      ipcRenderer.once("specific-setting-data", (event, arg) => {
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
          dispatch(receiveSettings(arg.settingName, arg.data));
          resolve(arg.data);
        }
      });
    });
  }
};

const requestSettings = function () {
  return {
    type: TYPES.LOCATIONS_REQUEST
  }
};

const receiveLocations = function (data) {
  return {
    type: TYPES.LOCATIONS_RECEIVE,
    data
  }
}

const fetchingFailed = function (error) {
  return {
    type: TYPES.LOCATIONS_FETCHING_FAILED,
    payload: error
  }
};

const updateLocationsInStore = function (data) {
  return {
    type: TYPES.LOCATIONS_UPDATE,
    data
  }
};

export const updateLocations = (data) => {
  return dispatch => {
    // update in store for better user experience
    dispatch(updateSettingsInStore(data));
  }
}

export const saveLocations = (payload, notifOn = true) => {

  return dispatch => {
    return new Promise((resolve, reject) => {
      //send a request to backend to get the data
      ipcRenderer.send("update-specific-setting", payload);
      //listen when the data comes back
      ipcRenderer.once("specific-setting-updated", (event, arg) => {
        if (arg.error) {
          //send the error to the notification center
          toast.error(arg.error, {
            onOpen: () => playSound(soundTypes.error)
          });
          reject(false);
        } else {
          if (notifOn)
            // success
            toast.success("ההגדרות נשמרו בהצלחה.", {
              onOpen: () => playSound(soundTypes.message)
            });
          resolve(true);
        }
      });
    }); // end promise
  }; // end dispatch func
};

export const cleanup = (settingName) => {
  return {
    type: TYPES.LOCATIONS_CLEANUP
  }
}