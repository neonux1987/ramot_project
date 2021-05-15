import { ipcSendReceive } from './util/util';
import { showSavedNotification } from './savedNotificationActions';


// TYPES
export const TYPES = {
  SUMMARIZED_BUDGETS_REQUEST: "SUMMARIZED_BUDGETS_REQUEST",
  SUMMARIZED_BUDGETS_RECEIVE: "SUMMARIZED_BUDGETS_RECEIVE",
  SUMMARIZED_BUDGETS_FETCHING_FAILED: "SUMMARIZED_BUDGETS_FETCHING_FAILED",
  SUMMARIZED_BUDGETS_UPDATE: "SUMMARIZED_BUDGETS_UPDATE",
  SUMMARIZED_BUDGETS_DELETE: "SUMMARIZED_BUDGETS_DELETE",
  SUMMARIZED_BUDGETS_INIT_STATE: "SUMMARIZED_BUDGETS_INIT_STATE",
  SUMMARIZED_BUDGETS_CLEANUP: "SUMMARIZED_BUDGETS_CLEANUP",
  SUMMARIZED_BUDGETS_UPDATE_DATE: "SUMMARIZED_BUDGETS_UPDATE_DATE"
}

export const fetchSummarizedBudgets = (params = Object) => {
  return dispatch => {

    //let react know that the fetching is started
    dispatch(requestSummarizedBudgets(params.buildingId));

    return ipcSendReceive({
      send: {
        channel: "get-summarized-budgets",
        params
      },
      receive: {
        channel: "summarized-budgets"
      },
      onSuccess: result => dispatch(receiveSummarizedBudgets(result.data, params.date, params.buildingId)),
      onError: result => dispatch(summarizedBudgetsFetchingFailed(result.error, params.buildingId))
    });

  }
};

export const fetchSummarizedBudgetsByRange = (params = Object) => {
  return dispatch => {

    //let react know that the fetching is started
    dispatch(requestSummarizedBudgets(params.buildingId));

    return ipcSendReceive({
      send: {
        channel: "get-summarized-budgets-by-range",
        params
      },
      receive: {
        channel: "summarized-budgets-by-range-data"
      },
      onSuccess: result => dispatch(receiveSummarizedBudgets(result.data, params.date, params.buildingId)),
      onError: result => dispatch(summarizedBudgetsFetchingFailed(result.error, params.buildingId))
    });

  }
};

export const fetchSummarizedBudgetsTopIncomeOutcome = (params = Object) => {
  return dispatch => {

    //let react know that the fetching is started
    dispatch(requestSummarizedBudgets(params.buildingId));

    return ipcSendReceive({
      send: {
        channel: "get-summarized-budgets-top-income-outcome",
        params
      },
      receive: {
        channel: "summarized-budgets-top-income-outcome-data"
      },
      onSuccess: result => dispatch(receiveSummarizedBudgets(result.data, params.date, params.buildingId)),
      onError: result => dispatch(summarizedBudgetsFetchingFailed(result.error, params.buildingId))
    });

  }
};

const requestSummarizedBudgets = function (buildingId) {
  return {
    type: TYPES.SUMMARIZED_BUDGETS_REQUEST,
    buildingId
  }
};

const receiveSummarizedBudgets = function (data, date, buildingId) {
  return {
    type: TYPES.SUMMARIZED_BUDGETS_RECEIVE,
    data,
    date,
    buildingId
  }
}

export const updateSummarizedBudget = (params, oldCopy, newCopy, index) => {
  return dispatch => {
    const buildingId = params.buildingId;

    const fullSummarizedBudget = {
      ...oldCopy,
      ...newCopy
    }

    // first update the store for fast user response
    dispatch(updateSummarizedBudgetInStore(buildingId, fullSummarizedBudget, index));

    return ipcSendReceive({
      send: {
        channel: "update-summarized-budget",
        params
      },
      receive: {
        channel: "summarized-budget-updated"
      },
      onSuccess: () => dispatch(showSavedNotification()),
      onError: () => updateSummarizedBudgetInStore(buildingId, oldCopy, index)
    });

  }
};

const updateSummarizedBudgetInStore = (buildingId, payload, index) => {
  return {
    type: TYPES.SUMMARIZED_BUDGETS_UPDATE,
    index,
    payload,
    buildingId
  };
}

export const summarizedBudgetsCleanup = function (buildingId) {
  return {
    type: TYPES.SUMMARIZED_BUDGETS_CLEANUP,
    buildingId
  }
}

export const updateDate = function (buildingId, date) {
  return {
    type: TYPES.SUMMARIZED_BUDGETS_UPDATE_DATE,
    buildingId,
    date
  }
}

const summarizedBudgetsFetchingFailed = function (error, buildingId) {
  return {
    type: TYPES.SUMMARIZED_BUDGETS_FETCHING_FAILED,
    payload: error,
    buildingId
  }
};