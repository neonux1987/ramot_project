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
    dispatch(requestSummarizedBudgets(params.buildingNameEng));

    return ipcSendReceive({
      send: {
        channel: "get-summarized-budgets",
        params
      },
      receive: {
        channel: "summarized-budgets"
      },
      onSuccess: result => dispatch(receiveSummarizedBudgets(result.data, params.date, params.buildingNameEng)),
      onError: result => dispatch(summarizedBudgetsFetchingFailed(result.error, params.buildingNameEng))
    });

  }
};

export const fetchSummarizedBudgetsByRange = (params = Object) => {
  return dispatch => {

    //let react know that the fetching is started
    dispatch(requestSummarizedBudgets(params.buildingNameEng));

    return ipcSendReceive({
      send: {
        channel: "get-summarized-budgets-by-range",
        params
      },
      receive: {
        channel: "summarized-budgets-by-range-data"
      },
      onSuccess: result => dispatch(receiveSummarizedBudgets(result.data, params.date, params.buildingNameEng)),
      onError: result => dispatch(summarizedBudgetsFetchingFailed(result.error, params.buildingNameEng))
    });

  }
};

export const fetchSummarizedBudgetsTopIncomeOutcome = (params = Object) => {
  return dispatch => {

    //let react know that the fetching is started
    dispatch(requestSummarizedBudgets(params.buildingNameEng));

    return ipcSendReceive({
      send: {
        channel: "get-summarized-budgets-top-income-outcome",
        params
      },
      receive: {
        channel: "summarized-budgets-top-income-outcome-data"
      },
      onSuccess: result => dispatch(receiveSummarizedBudgets(result.data, params.date, params.buildingNameEng)),
      onError: result => dispatch(summarizedBudgetsFetchingFailed(result.error, params.buildingNameEng))
    });

  }
};

const requestSummarizedBudgets = function (buildingNameEng) {
  return {
    type: TYPES.SUMMARIZED_BUDGETS_REQUEST,
    buildingNameEng
  }
};

const receiveSummarizedBudgets = function (data, date, buildingNameEng) {
  return {
    type: TYPES.SUMMARIZED_BUDGETS_RECEIVE,
    data,
    date,
    buildingNameEng
  }
}

export const updateSummarizedBudget = (params, oldCopy, newCopy, index) => {
  return dispatch => {
    const buildingNameEng = params.buildingNameEng;

    const fullSummarizedBudget = {
      ...oldCopy,
      ...newCopy
    }

    // first update the store for fast user response
    dispatch(updateSummarizedBudgetInStore(buildingNameEng, fullSummarizedBudget, index));

    return ipcSendReceive({
      send: {
        channel: "update-summarized-budget",
        params
      },
      receive: {
        channel: "summarized-budget-updated"
      },
      onSuccess: () => dispatch(showSavedNotification()),
      onError: () => updateSummarizedBudgetInStore(buildingNameEng, oldCopy, index)
    });

  }
};

const updateSummarizedBudgetInStore = (buildingNameEng, payload, index) => {
  return {
    type: TYPES.SUMMARIZED_BUDGETS_UPDATE,
    index,
    payload,
    buildingNameEng
  };
}

export const summarizedBudgetsCleanup = function (buildingNameEng) {
  return {
    type: TYPES.SUMMARIZED_BUDGETS_CLEANUP,
    buildingNameEng
  }
}

export const updateDate = function (buildingNameEng, date) {
  return {
    type: TYPES.SUMMARIZED_BUDGETS_UPDATE_DATE,
    buildingNameEng,
    date
  }
}

const summarizedBudgetsFetchingFailed = function (error, buildingNameEng) {
  return {
    type: TYPES.SUMMARIZED_BUDGETS_FETCHING_FAILED,
    payload: error,
    buildingNameEng
  }
};