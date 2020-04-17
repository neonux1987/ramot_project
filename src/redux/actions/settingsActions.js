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
  SETTINGS_RECEIVE_SPECIFIC_SETTING: "SETTINGS_RECEIVE_SPECIFIC_SETTING",
  SETTINGS_CLEANUP: "SETTINGS_CLEANUP"
}

/**
 * fetch general settings
 * @param {*} params 
 */
export const fetchSettings = () => {
  console.log("yes");
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
        toast.error(arg.error, {
          onOpen: () => playSound(soundTypes.error)
        });
      } else {
        //success store the data
        dispatch(receiveSettings(arg.data));
      }
    });
  }
};

export const fetchSpecificSetting = (settingName) => {

  return dispatch => {

    //let react know that the fetching is started
    //dispatch(requestSettings());

    //request request to backend to get the data
    ipcRenderer.send("get-specific-setting", settingName);
    //listen when the data comes back
    ipcRenderer.once("specific-setting-data", (event, arg) => {
      if (arg.error) {
        //let react know that an erro occured while trying to fetch
        // dispatch(fetchingFailed(arg.error));
        //send the error to the notification center
        toast.error(arg.error, {
          onOpen: () => playSound(soundTypes.error)
        });
      } else {
        //success store the data
        dispatch(receiveSpecificSetting(settingName, arg.data));
      }
    });
  }
};

const requestSettings = function () {
  return {
    type: TYPES.SETTINGS_REQUEST
  }
};

const receiveSettings = function (data) {
  return {
    type: TYPES.SETTINGS_RECEIVE,
    data
  }
}

const receiveSpecificSetting = function (settingName, data) {
  return {
    type: TYPES.SETTINGS_RECEIVE_SPECIFIC_SETTING,
    settingName,
    data
  }
}

const fetchingFailed = function (error) {
  return {
    type: TYPES.SETTINGS_FETCHING_FAILED,
    payload: error
  }
};

const updateSettingsInStore = function (name, data) {
  return {
    type: TYPES.SETTINGS_UPDATE,
    name,
    data
  }
};

/**
 * update general settings
 * @param {*} params 
 */
export const updateSettings = (key, data) => {
  return dispatch => {
    dispatch(updateSettingsInStore(key, data));
  }
};

/**
 * update general settings
 * @param {*} params 
 */
export const saveSettings = (data) => {
  return dispatch => {
    //send a request to backend to get the data
    ipcRenderer.send("save-settings", data);
    //listen when the data comes back
    ipcRenderer.once("saved-settings", (event, arg) => {
      if (arg.error) {
        //send the error to the notification center
        toast.error(arg.error, {
          onOpen: () => playSound(soundTypes.error)
        });
      } else {
        //success
        toast.success("ההגדרות נשמרו בהצלחה.", {
          onOpen: () => playSound(soundTypes.message)
        });
      }
    });
  }
};

export const updateSepcificSetting = (settingName, payload) => {
  return dispatch => {
    //send a request to backend to get the data
    ipcRenderer.send("update-specific-setting", settingName, payload);
    //listen when the data comes back
    ipcRenderer.once("specific-setting-updated", (event, arg) => {
      if (arg.error) {
        //send the error to the notification center
        toast.error(arg.error, {
          onOpen: () => playSound(soundTypes.error)
        });
      } else {
        //success
        toast.success("ההגדרות נשמרו בהצלחה.", {
          onOpen: () => playSound(soundTypes.message)
        });
        dispatch(restartService(settingName));
      }
    });
  }
};

/**
 * update db backup specific settings
 * @param {*} key 
 * @param {*} data 
 */
export const updateBackupSettings = (key, data) => {
  return dispatch => {
    dispatch({
      type: TYPES.SETTINGS_DB_BACKUP_UPDATE,
      key,
      data
    });
  }
}

export const enableDbBackup = (db_backup) => {

  return dispatch => {
    //send a request to backend to get the data
    ipcRenderer.send("enable-db-backup");
    //listen when the data comes back
    ipcRenderer.once("db-backup-enabled", (event, arg) => {

      if (arg.error) {
        //send the error to the notification center
        toast.error(arg.error, {
          onOpen: () => playSound(soundTypes.error)
        });
      } else {
        //success
        toast.success("גיבוי בסיס הנתונים הופעל.", {
          onOpen: () => playSound(soundTypes.message)
        });
        dispatch(updateSettingsInStore("db_backup", db_backup));
      }
    });
  }
}

export const disableDbBackup = (db_backup) => {
  return dispatch => {
    //send a request to backend to get the data
    ipcRenderer.send("disable-db-backup");
    //listen when the data comes back
    ipcRenderer.once("db-backup-disabled", (event, arg) => {
      if (arg.error) {
        //send the error to the notification center
        toast.error(arg.error, {
          onOpen: () => playSound(soundTypes.error)
        });
      } else {
        //send the error to the notification center
        toast.warn("גיבוי בסיס הנתונים הושבת.", {
          onOpen: () => playSound(soundTypes.message)
        });
        dispatch(updateSettingsInStore("db_backup", db_backup));
      }
    });
  }
}

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