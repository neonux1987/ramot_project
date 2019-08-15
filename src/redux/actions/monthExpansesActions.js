import { ipcRenderer } from 'electron';
import dateActions from './dateActions';
import { notify, notificationTypes } from '../../components/Notifications/Notification';
import { playSound, soundTypes } from '../../audioPlayer/audioPlayer';

/**
 * fetch month expanses
 * @param {*} params 
 */
const fetchExpanses = (params = Object) => {
  return dispatch => {

    //let react know that the fetching is started
    dispatch(requestExpanses());

    //request request to backend to get the data
    ipcRenderer.send("get-month-expanses-data", params);
    //listen when the data comes back
    ipcRenderer.once("month-expanses-data", (event, arg) => {
      if (arg.error) {
        //let react know that an erro occured while trying to fetch
        dispatch(fetchingFailed(arg.error));
        //send the error to the notification center
        notify({
          isError: true,
          type: notificationTypes.db,
          message: arg.error
        });
        playSound(soundTypes.error);
      } else {
        //success store the data
        dispatch(receiveExpanses(arg.data));
        //update the date to he requested date in the params of the data
        dispatch(dateActions.updateDate(params.date));
      }
    });
  }
};

const requestExpanses = function () {
  return {
    type: "REQUEST_MONTH_EXPANSES"
  }
};

const receiveExpanses = function (data) {
  return {
    type: "RECEIVE_MONTH_EXPANSES",
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
 * add expanse
 * @param {*} payload 
 * @param {*} tableData 
 */
const addExpanse = (params = Object, tableData, expanse) => {
  return dispatch => {
    //send a request to backend to get the data
    ipcRenderer.send("add-new-month-expanse", params);
    //listen when the data comes back
    ipcRenderer.once("month-expanse-added", (event, arg) => {
      if (arg.error) {
        //let react know that an erro occured while trying to fetch
        dispatch(fetchingFailed(arg.error));
        //send the error to the notification center
        notify({
          isError: true,
          type: notificationTypes.db,
          message: arg.error
        });
        playSound(soundTypes.error);
      } else {
        expanse.id = arg[0];
        tableData.push(expanse);
        //success store the data
        dispatch(receiveExpanses(tableData));
        //dispatch(fetchExpanses(params));
      }
    });
  }
};

/**
 * update expanse
 * @param {*} payload 
 * @param {*} tableData 
 */
const updateExpanse = (params = Object, tableData = Array, target, fieldName) => {
  return dispatch => {

    //first update the store for fast user respond
    dispatch({
      type: "UPDATE_MONTH_EXPANSE",
      payload: {
        index: params.index,
        expanse: params.expanse
      }
    });
    //send a request to backend to get the data
    ipcRenderer.send("update-month-expanse", params);
    //listen when the data comes back
    ipcRenderer.once("month-expanse-updated", (event, arg) => {
      if (arg.error) {
        //reverse the changes to the old data
        dispatch(receiveExpanses(tableData));
        //set the input field value back to the old value
        target.value = tableData[params.index][fieldName];
        notify({
          isError: true,
          type: notificationTypes.db,
          message: arg.error
        });
        playSound(soundTypes.error);
      } else {
        notify({
          type: notificationTypes.message,
          message: "השורה עודכנה בהצלחה."
        });
        playSound(soundTypes.message);
      }
    });
  }
};

/**
 * update expanse
 * @param {*} payload 
 * @param {*} tableData 
 */
const deleteExpanse = (params = Object, tableData = Array) => {
  return dispatch => {
    //send a request to backend to get the data
    ipcRenderer.send("delete-month-expanse", params);
    //listen when the data comes back
    ipcRenderer.once("month-expanse-deleted", (event, arg) => {
      if (arg.error) {
        notify({
          isError: true,
          type: notificationTypes.db,
          message: arg.error
        });
        playSound(soundTypes.error);
      } else {
        dispatch(receiveExpanses(tableData));
        notify({
          type: notificationTypes.message,
          message: "השורה נמחקה בהצלחה."
        });
        playSound(soundTypes.message);
      }
    });
  }
};

export default {
  fetchExpanses,
  addExpanse,
  updateExpanse,
  fetchingFailed,
  receiveExpanses,
  requestExpanses,
  deleteExpanse
};