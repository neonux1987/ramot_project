import { ipcRenderer } from 'electron';
import { playSound, soundTypes } from '../../audioPlayer/audioPlayer';
import { toast } from 'react-toastify';

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
const updateSettings = (key, data) => {
  return dispatch => {
    dispatch(updateSettingsInStore(key, data));
  }
};

/**
 * update general settings
 * @param {*} params 
 */
const saveSettings = (data) => {
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

const enableDbBackup = (db_backup) => {
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

const disableDbBackup = (db_backup) => {
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
        toast.success("גיבוי בסיס הנתונים הושבת.", {
          onOpen: () => playSound(soundTypes.message)
        });
        dispatch(updateSettingsInStore("db_backup", db_backup));
      }
    });
  }
}

const updateDbBackupSettings = () => {
  //send a request to backend to get the data
  ipcRenderer.send("update-db-backup");
  //listen when the data comes back
  ipcRenderer.once("db-backup-updated", (event, arg) => {
    if (arg.error) {
      //send the error to the notification center
      toast.error(arg.error, {
        onOpen: () => playSound(soundTypes.error)
      });
    } else {
      //send the error to the notification center
      toast.success("גיבוי בסיס הנתונים הושבת.", {
        onOpen: () => playSound(soundTypes.message)
      });
    }
  });
}

export default {
  fetchSettings,
  saveSettings,
  fetchingFailed,
  receiveSettings,
  requestSettings,
  updateSettings,
  enableDbBackup,
  disableDbBackup
};