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
          dispatch(receiveSettings(settingName, arg.data));
          resolve(arg.data);
        }
      });
    });
  }
};

const requestSettings = function (settingName) {
  return {
    type: TYPES.SETTINGS_REQUEST,
    settingName
  }
};

const receiveSettings = function (settingName, data) {
  return {
    type: TYPES.SETTINGS_RECEIVE,
    settingName,
    data
  }
}

const fetchingFailed = function (settingName, error) {
  return {
    type: TYPES.SETTINGS_FETCHING_FAILED,
    settingName,
    payload: error
  }
};

const updateSettingsInStore = function (settingName, data) {
  return {
    type: TYPES.SETTINGS_UPDATE,
    settingName,
    data
  }
};

export const updateSettings = (settingName, data) => {
  return dispatch => {
    // update in store for better user experience
    dispatch(updateSettingsInStore(settingName, data));
  }
}

export const saveSettings = (settingName, payload, notifOn = true) => {

  return dispatch => {
    return new Promise((resolve, reject) => {
      //send a request to backend to get the data
      ipcRenderer.send("update-specific-setting", settingName, payload);
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


export const dbIndependentBackup = (fullPath) => {
  return dispatch => {
    //backup started message
    const toastId = toast.info(<ToastRender spinner={true} message={"מתבצע כעת גיבוי בסיס נתונים..."} />, {
      autoClose: false,
      onOpen: () => playSound(soundTypes.message)
    });
    //send a request to backend to get the data
    ipcRenderer.send("db-independent-backup", fullPath);
    //listen when the data comes back
    ipcRenderer.once("db-independently-backed-up", (event, arg) => {
      if (arg.error) {
        //send the error to the notification center
        toast.error(arg.error, {
          onOpen: () => playSound(soundTypes.error)
        });
      } else {
        //send the error to the notification center
        toast.success(<ToastRender done={true} message={"גיבוי בסיס הנתונים הסתיים בהצלחה."} />, {
          delay: 2000,
          autoClose: 3000,
          onOpen: () => {
            toast.dismiss(toastId);
            playSound(soundTypes.message)
          }
        });
      }
    });
  }
}

export const activateReportsGenerator = (reports_generator) => {
  return dispatch => {
    //send a request to backend to get the data
    ipcRenderer.send("activate-reports-generator");
    //listen when the data comes back
    ipcRenderer.once("reports-generator-activated", (event, arg) => {

      if (arg.error) {
        //send the error to the notification center
        toast.error(arg.error, {
          onOpen: () => playSound(soundTypes.error)
        });
      } else {
        //success
        toast.success("שירות יצירת הדוחות האוטומטי הופעל בהצלחה.", {
          onOpen: () => playSound(soundTypes.message)
        });
        dispatch(updateSettingsInStore("reports_generator", reports_generator));
      }
    });
  }
}

export const disableReportsGenerator = (reports_generator) => {
  return dispatch => {
    //send a request to backend to get the data
    ipcRenderer.send("disable-reports-generator");
    //listen when the data comes back
    ipcRenderer.once("reports-generator-disabled", (event, arg) => {

      if (arg.error) {
        //send the error to the notification center
        toast.error(arg.error, {
          onOpen: () => playSound(soundTypes.error)
        });
      } else {
        //success
        toast.success("שירות יצירת הדוחות האוטומטי בוטל בהצלחה.", {
          onOpen: () => playSound(soundTypes.message)
        });
        dispatch(updateSettingsInStore("reports_generator", reports_generator));
      }
    });
  }
}

export const cleanup = () => {
  return {
    type: TYPES.SETTINGS_CLEANUP
  }
}