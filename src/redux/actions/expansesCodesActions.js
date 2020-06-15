import { ipcSendReceive } from './util/util';
import { toastManager } from '../../toasts/ToastManager';
import { showSavedNotification } from './savedNotificationActions';

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

    return ipcSendReceive({
      send: {
        channel: "get-expanses-codes-by-status",
        params: status
      },
      receive: {
        channel: "expanses-codes-by-status"
      },
      onSuccess: (result) => {
        //success store the data
        dispatch(receiveExpansesCodes(result.data));
      },
      onError: (result) => {
        //let react know that an erro occured while trying to fetch
        dispatch(fetchingFailed(result.error));
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

    return ipcSendReceive({
      send: {
        channel: "add-expanse-code",
        params: expanseCode
      },
      receive: {
        channel: "expanse-code-added"
      },
      onSuccess: (result) => {
        expanseCode.id = result.data;

        dispatch(addStoreOnly(expanseCode));
        //send success notification
        toastManager.success("הקוד נוסף בהצלחה.");
      },
      onError: (result) => {
        //let react know that an erro occured while trying to fetch
        dispatch(fetchingFailed(result.error));
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
        codeName: newCopy.codeName,
        with_vat: newCopy.with_vat
      }
    };

    return ipcSendReceive({
      send: {
        channel: "update-expanse-code",
        params
      },
      receive: {
        channel: "expanse-code-updated"
      },
      onSuccess: () => dispatch(showSavedNotification()),
      onError: () => {
        // rollback
        dispatch(updateStoreOnly(oldCopy, index));
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

export const deleteExpanseCode = (id, oldCopy, index) => {
  return dispatch => {
    //delete the item in store first
    dispatch(deleteStoreOnly(index));

    return ipcSendReceive({
      send: {
        channel: "delete-expanse-code",
        params: id
      },
      receive: {
        channel: "expanse-code-deleted"
      },
      onSuccess: (result) => {
        //send success notification
        toastManager.success("הקוד נמחקה בהצלחה.");
      },
      onError: () => {
        //delete the item in store first
        dispatch(addStoreOnly(oldCopy));
      }
    });

  }
};

export const expansesCodesCleanup = () => {
  return {
    type: TYPES.EXPANSES_CODES_CLEANUP
  }
}