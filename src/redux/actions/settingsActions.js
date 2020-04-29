import { myToasts } from '../../CustomToasts/myToasts';
import { ipcSendReceive } from './util/util';

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

    //let react know that the fetching is started
    dispatch(requestSettings(settingName));

    return ipcSendReceive({
      send: {
        channel: "get-specific-setting",
        params: settingName
      },
      receive: {
        channel: "specific-setting-data"
      },
      onSuccess: (result) => dispatch(receiveSettings(result.settingName, result.data)),
      onError: (result) => {
        dispatch(fetchingFailed(result.error));

        myToasts.error(result.error)
      }
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

    return ipcSendReceive({
      send: {
        channel: "update-specific-setting",
        params: { settingName, payload }
      },
      receive: {
        channel: "specific-setting-updated"
      },
      onSuccess: () => myToasts.success("ההגדרות נשמרו בהצלחה."),
      onError: (result) => {
        dispatch(fetchingFailed(result.error));

        myToasts.error(result.error)
      }
    });

  }; // end dispatch func
};

export const cleanup = (settingName) => {
  return {
    type: TYPES.SETTINGS_CLEANUP,
    settingName
  }
}