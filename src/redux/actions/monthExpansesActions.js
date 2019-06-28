import { ipcRenderer } from 'electron';
import dateActions from './dateActions';

/**
 * fetch month expanses
 * @param {*} payload 
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
const addExpanse = (params = Object, tableData) => {
  return dispatch => {
    //send a request to backend to get the data
    ipcRenderer.send("add-new-month-expanse", params);
    //listen when the data comes back
    ipcRenderer.once("month-expanse-added", () => {
      dispatch(receiveExpanses(tableData));
    });
  }
};

/**
 * update expanse
 * @param {*} payload 
 * @param {*} tableData 
 */
const updateExpanse = (params = Object, tableData = Array) => {
  return dispatch => {
    //send a request to backend to get the data
    ipcRenderer.send("update-month-expanse", params);
    //listen when the data comes back
    ipcRenderer.once("month-expanse-updated", () => {
      dispatch(receiveExpanses(tableData));
    });
  }
};

export default {
  fetchExpanses,
  addExpanse,
  updateExpanse,
  fetchingFailed,
  receiveExpanses,
  requestExpanses
};