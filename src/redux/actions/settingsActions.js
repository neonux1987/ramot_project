import { toastManager } from "../../toasts/toastManager";
import { ipcSendReceive } from "./util/util";
import { setItem } from "../../localStorage/localStorage";
// TYPES
export const TYPES = {
  SETTINGS_REQUEST: "SETTINGS_REQUEST",
  SETTINGS_RECEIVE: "SETTINGS_RECEIVE",
  SETTINGS_FETCHING_FAILED: "SETTINGS_FETCHING_FAILED",
  SETTINGS_UPDATE: "SETTINGS_UPDATE",
  SETTINGS_UPDATE_SEPCIFIC: "SETTINGS_UPDATE_SEPCIFIC",
  SETTINGS_DB_BACKUP_UPDATE: "SETTINGS_DB_BACKUP_UPDATE",
  SETTINGS_CLEANUP: "SETTINGSS_CLEANUP"
};

export const fetchSettings = (settingName) => {
  return (dispatch) => {
    //let react know that the fetching is started
    dispatch(requestSettings(settingName));

    return ipcSendReceive({
      send: {
        channel: "get-settings",
        params: settingName
      },
      receive: {
        channel: "settings-data"
      },
      onSuccess: (result) => {
        dispatch(receiveSettings(result.data));
        setItem("settings", result.data);
      },
      onError: (result) => dispatch(fetchingFailed(result.error))
    });
  };
};

export const fetchSpecificSetting = (settingName) => {
  return (dispatch) => {
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
      onSuccess: (result) =>
        dispatch(receiveSettings(result.settingName, result.data)),
      onError: (result) => dispatch(fetchingFailed(result.error))
    });
  };
};

const requestSettings = function () {
  return {
    type: TYPES.SETTINGS_REQUEST
  };
};

const receiveSettings = function (data) {
  return {
    type: TYPES.SETTINGS_RECEIVE,
    data
  };
};

const fetchingFailed = function (error) {
  return {
    type: TYPES.SETTINGS_FETCHING_FAILED,
    payload: error
  };
};

const updateSpecificSettingsInStore = function (settingName, payload) {
  return {
    type: TYPES.SETTINGS_UPDATE_SEPCIFIC,
    settingName,
    payload
  };
};

const updateSettingsInStore = function (payload) {
  return {
    type: TYPES.SETTINGS_UPDATE,
    payload
  };
};

export const updateSpecificSettings = (settingName, payload) => {
  return (dispatch) => {
    // update in store for better user experience
    dispatch(updateSpecificSettingsInStore(settingName, payload));
  };
};

export const updateSettings = (payload) => {
  return (dispatch) => {
    // update in store for better user experience
    dispatch(updateSettingsInStore(payload));
  };
};

export const saveSettings = (notifOn = true) => {
  return (dispatch, getState) => {
    const state = getState();

    return ipcSendReceive({
      send: {
        channel: "save-settings",
        params: state.settings.data
      },
      receive: {
        channel: "saved-settings"
      },
      onSuccess: () => {
        setItem("settings", state.settings.data);
        if (notifOn) toastManager.success("ההגדרות נשמרו בהצלחה.");
      },
      onError: (result) => dispatch(fetchingFailed(result.error))
    });
  }; // end dispatch func
};

export const cleanup = () => {
  return {
    type: TYPES.SETTINGS_CLEANUP
  };
};
