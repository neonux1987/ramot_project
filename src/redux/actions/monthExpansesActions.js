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
  MONTH_EXPANSES_ADD_BUILDING_STATE: "MONTH_EXPANSES_ADD_BUILDING_STATE",
  MONTH_EXPANSES_CLEANUP: "MONTH_EXPANSES_CLEANUP",
  MONTH_EXPANSES_UPDATE_DATE: "MONTH_EXPANSES_UPDATE_DATE"
}

/**
 * fetch month expanses
 * @param {*} params 
 */
export const fetchMonthExpanses = (params) => {
  return async dispatch => {
    const { buildingId } = params;

    // let react know that the fetching is started
    dispatch(requestMonthExpanses(buildingId));

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
        dispatch(receiveMonthExpanses(result.data, buildingId));
      },
      onError: (result) => {
        // let react know that an erro occured while trying to fetch
        dispatch(monthExpansesFetchingFailed(result.error, buildingId));
      }
    });//end ipc send receive

  } // end return
};

const requestMonthExpanses = function (buildingId) {
  return {
    type: TYPES.MONTH_EXPANSES_REQUEST,
    buildingId
  }
};

const receiveMonthExpanses = function (data, buildingId) {
  return {
    type: TYPES.MONTH_EXPANSES_RECEIVE,
    data,
    buildingId
  }
}

export const monthExpansesCleanup = function (buildingId) {
  return {
    type: TYPES.MONTH_EXPANSES_CLEANUP,
    buildingId
  }
}

const monthExpansesFetchingFailed = function (error, buildingId) {
  return {
    type: TYPES.MONTH_EXPANSES_FETCHING_FAILED,
    error,
    buildingId
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
        dispatch(addMonthExpanseInStore(expanse, params.buildingId, sortByCode));

        toastManager.success("השורה נוספה בהצלחה.");
      },
      onError: (result) => {
        //let react know that an erro occured while trying to fetch
        dispatch(monthExpansesFetchingFailed(result.error));
      }
    });

  } // end annonymous method

}

const addMonthExpanseInStore = (payload, buildingId, sortByCode) => {
  return {
    type: TYPES.MONTH_EXPANSES_ADD,
    payload,
    buildingId,
    compareFunc: sortByCode
  }
}

export const updateMonthExpanse = (params, oldExpanse, index) => {
  return dispatch => {
    // first update the store for fast user response
    dispatch(updateMonthExpanseInStore(params.buildingId, params.expanse, index));

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
          buildingId: params.buildingId
        });
      }
    });

  }
};

const updateMonthExpanseInStore = (buildingId, payload, index) => {
  return {
    type: TYPES.MONTH_EXPANSES_UPDATE,
    index,
    payload,
    buildingId
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
        dispatch(deleteMonthExpanseInStore(index, params.buildingId));

        toastManager.success("השורה נמחקה בהצלחה.");
      }
    });

  }
};

export const updateDate = function (buildingId, date) {
  return {
    type: TYPES.MONTH_EXPANSES_UPDATE_DATE,
    buildingId,
    date
  }
}

const deleteMonthExpanseInStore = (index, buildingId) => {
  return {
    type: TYPES.MONTH_EXPANSES_DELETE,
    index,
    buildingId
  }
}

export const addBuildingState = (buildingId) => {
  return {
    type: TYPES.MONTH_EXPANSES_ADD_BUILDING_STATE,
    buildingId
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