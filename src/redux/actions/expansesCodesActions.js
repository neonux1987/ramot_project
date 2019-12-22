import { ipcRenderer } from 'electron';
import { playSound, soundTypes } from '../../audioPlayer/audioPlayer';
import { toast } from 'react-toastify';

// TYPES
export const TYPES = {
  EXPANSES_CODES_REQUEST: "EXPANSES_CODES_REQUEST",
  EXPANSES_CODES_RECEIVE: "EXPANSES_CODES_RECEIVE",
  EXPANSES_CODES_FETCHING_FAILED: "EXPANSES_CODES_FETCHING_FAILED",
  EXPANSES_CODES_UPDATE: "EXPANSES_CODES_UPDATE",
  EXPANSES_CODES_ADD: "EXPANSES_CODES_ADD",
  EXPANSES_CODES_DELETE: "EXPANSES_CODES_DELETE",
  EXPANSES_CODES_INIT_STATE: "EXPANSES_CODES_INIT_STATE",
  EXPANSES_CODES_CLEANUP: "EXPANSES_CODES_CLEANUP"
}

/**
 * fetch expanses codes
 * @param {*} params 
 */
export const fetchExpansesCodes = (params = Object) => {

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
    type: TYPES.EXPANSES_CODES_REQUEST
  }
};

const receiveExpansesCodes = function (data) {
  return {
    type: TYPES.EXPANSES_CODES_RECEIVE,
    data: data
  }
}

const fetchingFailed = function (error) {
  return {
    type: TYPES.EXPANSES_CODES_FETCHING_FAILED,
    payload: error
  }
};

/**
 * add expanse code
 * @param {*} payload 
 * @param {*} tableData 
 */
export const addExpanseCode = (params = Object, tableData) => {
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

const updateStoreOnly = (payload, index) => {
  return {
    type: TYPES.EXPANSES_CODES_UPDATE,
    index,
    payload
  }
}

/**
 * update expanse code
 * @param {*} payload 
 * @param {*} tableData 
 */
export const updateExpanseCode = (newCopy, oldCopy, index) => {
  return dispatch => {
    // first update the new copy in store 
    // for better user experience
    dispatch(updateStoreOnly(newCopy, index));

    const params = {
      id: newCopy.id,
      data: {
        summarized_section_id: newCopy.summarized_section_id,
        code: newCopy.code,
        codeName: newCopy.codeName
      }
    };

    //send a request to backend to get the data
    ipcRenderer.send("update-expanse-code", params);
    //listen when the data comes back
    ipcRenderer.once("expanse-code-updated", (event, arg) => {
      if (arg.error) {
        //send the error to the notification center
        toast.error(arg.error, {
          onOpen: () => playSound(soundTypes.error)
        });
        // rollback
        dispatch(updateStoreOnly(oldCopy, index));
      } else {
        //send success notification
        toast.success("הקוד עודכן בהצלחה.", {
          onOpen: () => playSound(soundTypes.message)
        });
      }
    });
  }
};

export const expansesCodesCleanup = () => {
  return {
    type: TYPES.EXPANSES_CODES_CLEANUP
  }
}