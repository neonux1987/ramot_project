import { ipcRenderer } from 'electron';
import { playSound, soundTypes } from '../../audioPlayer/audioPlayer';
import { toast } from 'react-toastify';
import { ipcSendReceive } from './util/util';
import { myToasts } from '../../CustomToasts/myToasts';

/**
 * fetch general settings
 * @param {*} params 
 */
const fetchGeneralSettings = () => {

  return dispatch => {

    //let react know that the fetching is started
    dispatch(requestGeneralSettings());

    return ipcSendReceive({
      send: {
        channel: "get-general-settings",
      },
      receive: {
        channel: "general-settings-data"
      },
      onSuccess: (result) => {
        //success store the data
        dispatch(receiveGeneralSettings(result.data));
      },
      onError: (result) => {
        //let react know that an erro occured while trying to fetch
        dispatch(fetchingFailed(result.error));

        myToasts.error(result.error);
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

    return ipcSendReceive({
      send: {
        channel: "update-general-settings",
        params
      },
      receive: {
        channel: "updated-general-settings"
      },
      onSuccess: (result) => {
        //success store the data
        dispatch(receiveGeneralSettings(tableData));

        myToasts.success("ההגדרות עודכנו בהצלחה.");
      },
      onError: (result) => myToasts.error(result.error)
    });

  }
};

const updateVat = (params = Object) => {
  return dispatch => {

    return ipcSendReceive({
      send: {
        channel: "update-general-settings",
        params
      },
      receive: {
        channel: "updated-general-settings"
      },
      onSuccess: (result) => {
        dispatch(updateVatInStore(params.settings.tax));

        myToasts.success('המע"מ עודכן בהצלחה.');
      },
      onError: (result) => myToasts.error(result.error)
    });

  }
};

const updateVatInStore = function (vat) {
  return {
    type: "UPDATE_VAT",
    vat
  }
};

export default {
  fetchGeneralSettings,
  updateGeneralSettings,
  fetchingFailed,
  receiveGeneralSettings,
  requestGeneralSettings,
  updateVat
};