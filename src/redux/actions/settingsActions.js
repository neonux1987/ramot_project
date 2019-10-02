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
        notify({
          isError: true,
          type: notificationTypes.message,
          message: arg.error
        });
      } else {
        //success
        notify({
          type: notificationTypes.message,
          message: "ההגדרות נשמרו בהצלחה."
        });
        playSound(soundTypes.message);
      }
    });
  }
};

const activateDbBackup = (db_backup) => {
  //send a request to backend to get the data
  ipcRenderer.send("activate-db-backup");
  return new Promise((resolve, reject) => {
    //listen when the data comes back
    ipcRenderer.once("db-backup-activated", (event, arg) => {
      if (arg.error) {
        //send the error to the notification center
        notify({
          isError: true,
          type: notificationTypes.message,
          message: arg.error
        });
        reject();
      } else {
        //success
        notify({
          type: notificationTypes.message,
          message: "גיבוי בסיס הנתונים הופעל."
        });
        playSound(soundTypes.message);
        resolve();
      }
    });
  })
}

const disableDbBackup = (db_backup) => {
  //send a request to backend to get the data
  ipcRenderer.send("disable-db-backup");
  return new Promise((resolve, reject) => {
    //listen when the data comes back
    ipcRenderer.once("db-backup-disabled", (event, arg) => {
      if (arg.error) {
        //send the error to the notification center
        notify({
          isError: true,
          type: notificationTypes.message,
          message: arg.error
        });
      } else {
        updateSettings("db_backup", db_backup)
        //send the error to the notification center
        notify({
          type: notificationTypes.message,
          message: "גיבוי בסיס הנתונים הושבת."
        });
        playSound(soundTypes.message);
      }
    });
  });
}

const updateDbBackupSettings = () => {
  //send a request to backend to get the data
  ipcRenderer.send("update-db-backup");
  //listen when the data comes back
  ipcRenderer.once("db-backup-updated", (event, arg) => {
    if (arg.error) {
      //send the error to the notification center
      notify({
        isError: true,
        type: notificationTypes.message,
        message: arg.error
      });
    } else {
      //send the error to the notification center
      notify({
        type: notificationTypes.message,
        message: "גיבוי בסיס הנתונים הושבת."
      });
      playSound(soundTypes.message);
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
  activateDbBackup,
  disableDbBackup
};