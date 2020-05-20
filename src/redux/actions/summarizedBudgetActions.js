import { myToaster } from '../../Toasts/toastManager';
import { ipcSendReceive } from './util/util';


// TYPES
export const TYPES = {
  SUMMARIZED_BUDGETS_REQUEST: "SUMMARIZED_BUDGETS_REQUEST",
  SUMMARIZED_BUDGETS_RECEIVE: "SUMMARIZED_BUDGETS_RECEIVE",
  SUMMARIZED_BUDGETS_FETCHING_FAILED: "SUMMARIZED_BUDGETS_FETCHING_FAILED",
  SUMMARIZED_BUDGETS_UPDATE: "SUMMARIZED_BUDGETS_UPDATE",
  SUMMARIZED_BUDGETS_ADD: "SUMMARIZED_BUDGETS_ADD",
  SUMMARIZED_BUDGETS_DELETE: "SUMMARIZED_BUDGETS_DELETE",
  SUMMARIZED_BUDGETS_INIT_STATE: "SUMMARIZED_BUDGETS_INIT_STATE",
  SUMMARIZED_BUDGETS_CLEANUP: "SUMMARIZED_BUDGETS_CLEANUP"
}

export const fetchSummarizedBudgets = (params = Object) => {
  return dispatch => {

    //let react know that the fetching is started
    dispatch(requestSummarizedBudgets(params.buildingName));

    return ipcSendReceive({
      send: {
        channel: "get-summarized-budgets",
        params
      },
      receive: {
        channel: "summarized-budgets"
      },
      onSuccess: result => dispatch(receiveSummarizedBudgets(result.data.data, params.date, params.buildingName)),
      onError: result => dispatch(summarizedBudgetsFetchingFailed(result.error, params.buildingName))
    });

  }
};

const requestSummarizedBudgets = function (buildingName) {
  return {
    type: TYPES.SUMMARIZED_BUDGETS_REQUEST,
    buildingName
  }
};

const receiveSummarizedBudgets = function (data, date, buildingName) {
  return {
    type: TYPES.SUMMARIZED_BUDGETS_RECEIVE,
    data,
    date,
    buildingName
  }
}

/**
 * init the state
 */
export const initSummarizedBudgetsState = function (buildingName) {
  return dispatch => {
    return new Promise((resolve, reject) => {
      if (buildingName) {
        dispatch(setSummarizedBudgetsInitialState(buildingName));
        resolve();
      } else {
        reject("page canot be empty/undefined or null");
      }
    });
  };
};

const setSummarizedBudgetsInitialState = function (buildingName) {
  return dispatch => {
    dispatch({
      type: TYPES.SUMMARIZED_BUDGETS_INIT_STATE,
      buildingName
    });
  }
};

export const updateSummarizedBudget = (params, oldCopy, newCopy, index) => {
  return dispatch => {
    const buildingName = params.buildingName;

    const fullSummarizedBudget = {
      ...oldCopy,
      ...newCopy
    }

    // first update the store for fast user response
    dispatch(updateSummarizedBudgetInStore(buildingName, fullSummarizedBudget, index));

    return ipcSendReceive({
      send: {
        channel: "update-summarized-budget",
        params
      },
      receive: {
        channel: "summarized-budget-updated"
      },
      onSuccess: () => myToaster.success("השורה עודכנה בהצלחה."),
      onError: () => updateSummarizedBudgetInStore(buildingName, oldCopy, index)
    });

  }
};

const updateSummarizedBudgetInStore = (buildingName, summarizedBudget, index) => {
  return {
    type: TYPES.SUMMARIZED_BUDGETS_UPDATE,
    index,
    payload: summarizedBudget,
    buildingName
  };
}

export const summarizedBudgetsCleanup = function (buildingName) {
  return {
    type: TYPES.SUMMARIZED_BUDGETS_CLEANUP,
    buildingName
  }
}

const summarizedBudgetsFetchingFailed = function (error, buildingName) {
  return {
    type: TYPES.SUMMARIZED_BUDGETS_FETCHING_FAILED,
    payload: error,
    buildingName
  }
};