import { ipcSendReceive } from './util/util';
import { myToasts } from '../../CustomToasts/myToasts';

// TYPES
export const TYPES = {
  MONTH_EXPANSES_REQUEST: "MONTH_EXPANSES_REQUEST",
  MONTH_EXPANSES_RECEIVE: "MONTH_EXPANSES_RECEIVE",
  MONTH_EXPANSES_FETCHING_FAILED: "MONTH_EXPANSES_FETCHING_FAILED",
  MONTH_EXPANSES_UPDATE: "MONTH_EXPANSES_UPDATE",
  MONTH_EXPANSES_ADD: "MONTH_EXPANSES_ADD",
  MONTH_EXPANSES_DELETE: "MONTH_EXPANSES_DELETE",
  MONTH_EXPANSES_INIT_STATE: "MONTH_EXPANSES_INIT_STATE",
  MONTH_EXPANSES_CLEANUP: "MONTH_EXPANSES_CLEANUP"
}

/**
 * fetch month expanses
 * @param {*} params 
 */
export const fetchMonthExpanses = (params = Object) => {
  return async dispatch => {
    // let react know that the fetching is started
    dispatch(requestMonthExpanses(params.buildingName));

    return ipcSendReceive({
      send: {
        channel: "get-month-expanses-data-by-range",
        params
      },
      receive: {
        channel: "month-expanses-data-by-range"
      },
      onSuccess: (result) => {
        // store the data
        dispatch(receiveMonthExpanses(result.data.data, params.buildingName));
      },
      onError: (result) => {
        // let react know that an erro occured while trying to fetch
        dispatch(monthExpansesFetchingFailed(result.error, params.buildingName));
      }
    });//end ipc send receive

  } // end return
};

const requestMonthExpanses = function (buildingName) {
  return {
    type: TYPES.MONTH_EXPANSES_REQUEST,
    buildingName
  }
};

const receiveMonthExpanses = function (data, buildingName) {
  return {
    type: TYPES.MONTH_EXPANSES_RECEIVE,
    data,
    buildingName
  }
}

export const initMonthExpansesState = function (buildingName) {
  return dispatch => {
    return new Promise((resolve, reject) => {
      if (buildingName) {
        dispatch(setMonthExpansesInitialState(buildingName));
        resolve();
      } else {
        reject("page cannot be empty/undefined or null");
      }
    });
  };
};

const setMonthExpansesInitialState = function (buildingName) {
  return dispatch => {
    dispatch({
      type: TYPES.MONTH_EXPANSES_INIT_STATE,
      buildingName
    });
  }
};

export const monthExpansesCleanup = function (buildingName) {
  return {
    type: TYPES.MONTH_EXPANSES_CLEANUP,
    buildingName
  }
}

const monthExpansesFetchingFailed = function (error, buildingName) {
  return {
    type: TYPES.MONTH_EXPANSES_FETCHING_FAILED,
    error,
    buildingName
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
        dispatch(addMonthExpanseInStore(expanse, params.buildingName, sortByCode));

        myToasts.success("השורה נוספה בהצלחה.");
      },
      onError: (result) => {
        //let react know that an erro occured while trying to fetch
        dispatch(monthExpansesFetchingFailed(result.error));
      }
    });

  } // end annonymous method

}

const addMonthExpanseInStore = (payload, buildingName, sortByCode) => {
  return {
    type: TYPES.MONTH_EXPANSES_ADD,
    payload,
    buildingName,
    compareFunc: sortByCode
  }
}

export const updateMonthExpanse = (params, oldExpanse, index) => {
  return dispatch => {
    // first update the store for fast user response
    dispatch(updateMonthExpanseInStore(params.buildingName, params.expanse, index));

    return ipcSendReceive({
      send: {
        channel: "update-month-expanse",
        params
      },
      receive: {
        channel: "month-expanse-updated"
      },
      onSuccess: () => {
        // send success notification
        myToasts.success("השורה עודכנה בהצלחה.");
      },
      onError: () => {
        // rollback to old expanse
        dispatch({
          type: TYPES.MONTH_EXPANSES_UPDATE,
          index,
          payload: oldExpanse,
          buildingName: params.buildingName
        });
      }
    });

  }
};

const updateMonthExpanseInStore = (buildingName, payload, index) => {
  return {
    type: TYPES.MONTH_EXPANSES_UPDATE,
    index,
    payload,
    buildingName
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
        dispatch(deleteMonthExpanseInStore(index, params.buildingName));

        myToasts.success("השורה נמחקה בהצלחה.");
      }
    });

  }
};

const deleteMonthExpanseInStore = (index, buildingName) => {
  return {
    type: TYPES.MONTH_EXPANSES_DELETE,
    index,
    buildingName
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