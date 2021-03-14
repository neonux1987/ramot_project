import { ipcSendReceive } from './util/util';
import { toastManager } from '../../toasts/toastManager';
import { showSavedNotification } from './savedNotificationActions';

// TYPES
export const TYPES = {
  MONTH_EXPANSES_REQUEST: "MONTH_EXPANSES_REQUEST",
  MONTH_EXPANSES_RECEIVE: "MONTH_EXPANSES_RECEIVE",
  MONTH_EXPANSES_FETCHING_FAILED: "MONTH_EXPANSES_FETCHING_FAILED",
  MONTH_EXPANSES_UPDATE: "MONTH_EXPANSES_UPDATE",
  MONTH_EXPANSES_ADD: "MONTH_EXPANSES_ADD",
  MONTH_EXPANSES_DELETE: "MONTH_EXPANSES_DELETE",
  MONTH_EXPANSES_INIT_STATE: "MONTH_EXPANSES_INIT_STATE",
  MONTH_EXPANSES_CLEANUP: "MONTH_EXPANSES_CLEANUP",
  MONTH_EXPANSES_UPDATE_DATE: "MONTH_EXPANSES_UPDATE_DATE"
}

/**
 * fetch month expanses
 * @param {*} params 
 */
export const fetchMonthExpanses = (params) => {
  return async dispatch => {
    const { buildingNameEng } = params;
    // let react know that the fetching is started
    dispatch(requestMonthExpanses(buildingNameEng));

    return ipcSendReceive({
      send: {
        channel: "get-month-expanses",
        params
      },
      receive: {
        channel: "month-expanses-data"
      },
      onSuccess: (result) => {
        // store the data
        dispatch(receiveMonthExpanses(result.data, buildingNameEng));
      },
      onError: (result) => {
        // let react know that an erro occured while trying to fetch
        dispatch(monthExpansesFetchingFailed(result.error, buildingNameEng));
      }
    });//end ipc send receive

  } // end return
};

const requestMonthExpanses = function (buildingNameEng) {
  return {
    type: TYPES.MONTH_EXPANSES_REQUEST,
    buildingNameEng
  }
};

const receiveMonthExpanses = function (data, buildingNameEng) {
  return {
    type: TYPES.MONTH_EXPANSES_RECEIVE,
    data,
    buildingNameEng
  }
}

export const monthExpansesCleanup = function (buildingNameEng) {
  return {
    type: TYPES.MONTH_EXPANSES_CLEANUP,
    buildingNameEng
  }
}

const monthExpansesFetchingFailed = function (error, buildingNameEng) {
  return {
    type: TYPES.MONTH_EXPANSES_FETCHING_FAILED,
    error,
    buildingNameEng
  }
};

export const addMonthExpanse = (params = Object, expanse = Object) => {
  return dispatch => {

    return ipcSendReceive({
      send: {
        channel: "add-new-month-expanse",
        params
      },
      receive: {
        channel: "month-expanse-added"
      },
      onSuccess: (result) => {
        //set the new id from the saved object in the db
        expanse.id = result.data;

        //success store the data
        dispatch(addMonthExpanseInStore(expanse, params.buildingNameEng, sortByCode));

        toastManager.success("השורה נוספה בהצלחה.");
      },
      onError: (result) => {
        //let react know that an erro occured while trying to fetch
        dispatch(monthExpansesFetchingFailed(result.error));
      }
    });

  } // end annonymous method

}

const addMonthExpanseInStore = (payload, buildingNameEng, sortByCode) => {
  return {
    type: TYPES.MONTH_EXPANSES_ADD,
    payload,
    buildingNameEng,
    compareFunc: sortByCode
  }
}

export const updateMonthExpanse = (params, oldExpanse, index) => {
  return dispatch => {
    // first update the store for fast user response
    dispatch(updateMonthExpanseInStore(params.buildingNameEng, params.expanse, index));

    return ipcSendReceive({
      send: {
        channel: "update-month-expanse",
        params
      },
      receive: {
        channel: "month-expanse-updated"
      },
      onSuccess: () => dispatch(showSavedNotification()),
      onError: () => {
        // rollback to old expanse
        dispatch({
          type: TYPES.MONTH_EXPANSES_UPDATE,
          index,
          payload: oldExpanse,
          buildingNameEng: params.buildingNameEng
        });
      }
    });

  }
};

const updateMonthExpanseInStore = (buildingNameEng, payload, index) => {
  return {
    type: TYPES.MONTH_EXPANSES_UPDATE,
    index,
    payload,
    buildingNameEng
  };
}

export const deleteMonthExpanse = (params = Object, index = Number) => {
  return dispatch => {

    return ipcSendReceive({
      send: {
        channel: "delete-month-expanse",
        params
      },
      receive: {
        channel: "month-expanse-deleted"
      },
      onSuccess: () => {
        dispatch(deleteMonthExpanseInStore(index, params.buildingNameEng));

        toastManager.success("השורה נמחקה בהצלחה.");
      }
    });

  }
};

export const updateDate = function (buildingNameEng, date) {
  return {
    type: TYPES.MONTH_EXPANSES_UPDATE_DATE,
    buildingNameEng,
    date
  }
}

const deleteMonthExpanseInStore = (index, buildingNameEng) => {
  return {
    type: TYPES.MONTH_EXPANSES_DELETE,
    index,
    buildingNameEng
  }
}

export function sortByCode(a, b) {
  if (a.code < b.code) {
    return -1;
  }
  if (a.code > b.code) {
    return 1;
  }
  // a must be equal to b
  return 0;
}