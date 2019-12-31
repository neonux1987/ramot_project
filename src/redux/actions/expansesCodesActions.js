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
  EXPANSES_CODES_RESTORE: "EXPANSES_CODES_RESTORE",
  EXPANSES_CODES_INIT_STATE: "EXPANSES_CODES_INIT_STATE",
  EXPANSES_CODES_CLEANUP: "EXPANSES_CODES_CLEANUP"
}

/**
 * fetch expanses codes
 * @param {*} params 
 */
export const fetchExpansesCodesByStatus = (status) => {

  return dispatch => {

    //let react know that the fetching is started
    dispatch(requestExpansesCodes());

    //request request to backend to get the data
    ipcRenderer.send("get-expanses-codes-by-status", status);
    //listen when the data comes back
    ipcRenderer.once("expanses-codes-by-status", (event, arg) => {
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
export const addExpanseCode = (expanseCode) => {
  return dispatch => {
    //send a request to backend to get the data
    ipcRenderer.send("add-expanse-code", expanseCode);
    //listen when the data comes back
    ipcRenderer.once("expanse-code-added", (event, arg) => {
      if (arg.error) {
        //send the error to the notification center
        toast.error(arg.error, {
          onOpen: () => playSound(soundTypes.error)
        });
      } else {
        expanseCode.id = arg.data;
        console.log(arg);
        dispatch(addStoreOnly(expanseCode));
        //send success notification
        toast.success("הקוד נוסף בהצלחה.", {
          onOpen: () => playSound(soundTypes.message)
        });
      }
    });
  }
};

const addStoreOnly = (payload) => {
  return {
    type: TYPES.EXPANSES_CODES_ADD,
    payload
  }
}

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

const deleteStoreOnly = (index) => {
  return {
    type: TYPES.EXPANSES_CODES_DELETE,
    index
  }
}

const restoreExpanseCodeInStoreOnly = (payload) => {
  return {
    type: TYPES.EXPANSES_CODES_RESTORE,
    payload
  }
}

export const deleteExpanseCode = (id, oldCopy, index) => {
  return dispatch => {
    //delete the item in store first
    dispatch(deleteStoreOnly(index));

    //request request to backend to get the data
    ipcRenderer.send("delete-expanse-code", id);
    //listen when the data comes back
    ipcRenderer.once("expanse-code-deleted", (event, arg) => {
      if (arg.error) {
        //delete the item in store first
        dispatch(restoreExpanseCodeInStoreOnly(oldCopy));
        //send the error to the notification center
        toast.error(arg.error, {
          onOpen: () => playSound(soundTypes.error)
        });
      } else {
        //send the error to the notification center
        toast.success("השורה נמחקה בהצלחה.", {
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