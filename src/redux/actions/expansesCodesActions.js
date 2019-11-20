import { ipcRenderer } from 'electron';
import { playSound, soundTypes } from '../../audioPlayer/audioPlayer';
import { toast } from 'react-toastify';

/**
 * fetch expanses codes
 * @param {*} params 
 */
const fetchExpansesCodes = (params = Object) => {

  return dispatch => {

    //let react know that the fetching is started
    dispatch(requestExpansesCodes());

    //request request to backend to get the data
    ipcRenderer.send("get-expanses-codes-data", params);
    //listen when the data comes back
    ipcRenderer.once("expanses-codes-data", (event, arg) => {
      if (arg.error) {
        //let react know that an erro occured while trying to fetch
        dispatch(fetchingFailed(arg.error));
        //send the error to the notification center
        toast.error(arg.error, {
          onOpen: () => playSound(soundTypes.error)
        });
      } else {
        //success store the data
        dispatch(receiveExpansesCodes(arg.data));
      }
    });
  }
};

const requestExpansesCodes = function () {
  return {
    type: "REQUEST_EXPANSES_CODES"
  }
};

const receiveExpansesCodes = function (data) {
  return {
    type: "RECEIVE_EXPANSES_CODES",
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
 * add expanse code
 * @param {*} payload 
 * @param {*} tableData 
 */
const addExpanseCode = (params = Object, tableData) => {
  return dispatch => {
    //send a request to backend to get the data
    ipcRenderer.send("add-expanse-code", params);
    //listen when the data comes back
    ipcRenderer.once("expanse-code-added", (event, arg) => {
      if (arg.error) {
        //send the error to the notification center
        toast.error(arg.error, {
          onOpen: () => playSound(soundTypes.error)
        });
      } else {
        params.id = arg.data;
        dispatch({
          type: "ADD_EXPANSE_CODE",
          payload: params
        });
        //send success notification
        toast.success("הקוד נוסף בהצלחה.", {
          onOpen: () => playSound(soundTypes.message)
        });
      }
    });
  }
};

/**
 * update expanse code
 * @param {*} payload 
 * @param {*} tableData 
 */
const updateExpanseCode = (params = Object, tableData = Array) => {
  return dispatch => {
    //send a request to backend to get the data
    ipcRenderer.send("update-expanse-code", params);
    //listen when the data comes back
    ipcRenderer.once("expanse-code-updated", (event, arg) => {
      if (arg.error) {
        //send the error to the notification center
        toast.error(arg.error, {
          onOpen: () => playSound(soundTypes.error)
        });
      } else {
        dispatch(receiveExpansesCodes(tableData));
        //send success notification
        toast.success("הקוד עודכן בהצלחה.", {
          onOpen: () => playSound(soundTypes.message)
        });
      }
    });
  }
};

const expansesCodesCleanup = () => {
  return {
    type: "EXPANSES_CODES_CLEANUP"
  }
}

export default {
  fetchExpansesCodes,
  addExpanseCode,
  updateExpanseCode,
  fetchingFailed,
  receiveExpansesCodes,
  requestExpansesCodes,
  expansesCodesCleanup
};