import { ipcSendReceive } from './util/util';
import { myToasts } from '../../CustomToasts/myToasts';

export const TYPES = {
  TABLE_SETTINGS_REQUEST: "REQUEST_TABLE_SETTINGS",
  TABLE_SETTINGS_RECEIVE: "RECEIVE_TABLE_SETTINGS",
  TABLE_SETTINGS_FETCHING_FAILED: "TABLE_SETTINGS_FETCHING_FAILED",
  TABLE_SETTINGS_UPDATE: "TABLE_SETTINGS_UPDATE",
  TABLE_SETTINGS_CLEANUP: "TABLE_SETTINGS_CLEANUP",
  TABLE_SETTINGS_SET_START_ELEMENT: "TABLE_SETTINGS_SET_START_ELEMENT",
  TABLE_SETTINGS_INIT: "TABLE_SETTINGS_INIT"
}

export const fetchTableSettings = (pageName) => {
  return dispatch => {

    //let react know that the fetching is started
    dispatch(requestTableSettings(pageName));

    return ipcSendReceive({
      send: {
        channel: "get-table-settings",
        params: pageName
      },
      receive: {
        channel: "table-settings"
      },
      onSuccess: result => dispatch(receiveTableSettings(pageName, result.data)),
      onError: result => dispatch(tableSettingsFetchingFailed(result.error))
    });

  } // end dispatch function
};

export const updateTableSettings = (pageName, settings) => {
  return dispatch => {

    // write update in store first logic here

    return ipcSendReceive({
      send: {
        channel: "update-table-settings",
        params: { pageName, settings }
      },
      receive: {
        channel: "updated-table-settings"
      },
      onSuccess: result => dispatch(receiveTableSettings(pageName, result.data)),
      onError: result => myToasts.error(result.error)
    });

  }
};

export const updateTableSettingsStore = (pageName, data) => {
  return dispatch => {
    dispatch({
      type: TYPES.TABLE_SETTINGS_UPDATE,
      pageName,
      data
    });
  }
}

export const setStartElement = (pageName, value) => {
  return dispatch => {
    dispatch({
      type: TYPES.SET_START_ELEMENT,
      value
    });
  }
}

const requestTableSettings = function (pageName) {
  return {
    type: TYPES.TABLE_SETTINGS_REQUEST,
    pageName
  }
};

const receiveTableSettings = function (pageName, settings) {
  return {
    type: TYPES.TABLE_SETTINGS_RECEIVE,
    pageName,
    settings
  }
}

const tableSettingsFetchingFailed = function (error) {
  return {
    type: TYPES.TABLE_SETTINGS_FETCHING_FAILED,
    payload: error
  }
};

export const tableSettingsCleanup = (pageName) => {
  return {
    type: TYPES.TABLE_SETTINGS_CLEANUP,
    pageName
  }
}

export const initTableSettings = (pageName) => {
  return dispatch => {
    return new Promise((resolve, reject) => {
      if (pageName) {
        dispatch({
          type: TYPES.TABLE_SETTINGS_INIT,
          pageName
        });
        resolve();
      } else {
        reject("pageName cannot be empty/undefined or null");
      }
    });
  }
}