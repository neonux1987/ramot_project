import * as monthlyStatsActions from './monthlyStatsActions';
import * as quarterlyStatsActions from './quarterlyStatsActions';
import { ipcSendReceive } from './util/util';
import { toastManager } from '../../toasts/toastManager';
import { showSavedNotification } from './savedNotificationActions';

// TYPES
export const TYPES = {
  BUDGET_EXECUTIONS_REQUEST: "BUDGET_EXECUTIONS_REQUEST",
  BUDGET_EXECUTIONS_RECEIVE: "BUDGET_EXECUTIONS_RECEIVE",
  BUDGET_EXECUTIONS_FETCHING_FAILED: "BUDGET_EXECUTIONS_FETCHING_FAILED",
  BUDGET_EXECUTIONS_UPDATE: "BUDGET_EXECUTIONS_UPDATE",
  BUDGET_EXECUTIONS_ADD: "BUDGET_EXECUTIONS_ADD",
  BUDGET_EXECUTIONS_DELETE: "BUDGET_EXECUTIONS_DELETE",
  BUDGET_EXECUTIONS_INIT_STATE: "BUDGET_EXECUTIONS_INIT_STATE",
  BUDGET_EXECUTIONS_CLEANUP: "BUDGET_EXECUTIONS_CLEANUP",
  BUDGET_EXECUTIONS_UPDATE_DATE: "BUDGET_EXECUTIONS_UPDATE_DATE"
}

export const fetchBudgetExecutions = (buildingInfo, date) => {
  return dispatch => {
    const { buildingNameEng } = buildingInfo;

    //let react know that the fetching is started
    dispatch(requestBudgetExecutions(buildingNameEng));

    return ipcSendReceive({
      send: {
        channel: "get-budget-executions",
        params: { buildingInfo, date }
      },
      receive: {
        channel: "budget-executions",
      },
      onSuccess: (result) => {
        //success store the data
        dispatch(receiveBudgetExecutions(result.data, buildingNameEng));
      },
      onError: (result) => {
        dispatch(budgetExecutionsFetchingFailed(result.error, buildingNameEng));
      }
    });

  }
};

const requestBudgetExecutions = function (buildingNameEng) {
  return {
    type: TYPES.BUDGET_EXECUTIONS_REQUEST,
    buildingNameEng
  }
};

const receiveBudgetExecutions = function (data, buildingNameEng) {
  return {
    type: TYPES.BUDGET_EXECUTIONS_RECEIVE,
    data,
    buildingNameEng
  }
}

const budgetExecutionsFetchingFailed = function (error, buildingNameEng) {
  return {
    type: TYPES.BUDGET_EXECUTIONS_FETCHING_FAILED,
    error,
    buildingNameEng
  }
};

export const initBudgetExecutionsState = function (buildingNameEng) {
  return dispatch => {
    return new Promise((resolve, reject) => {
      if (buildingNameEng) {
        dispatch(setInitialBudgetExecutionsState(buildingNameEng));
        resolve();
      } else {
        reject("page canot be empty/undefined or null");
      }
    });
  };
};

const setInitialBudgetExecutionsState = function (buildingNameEng) {
  return dispatch => {
    dispatch({
      type: TYPES.BUDGET_EXECUTIONS_INIT_STATE,
      buildingNameEng
    });
  }
};

export const budgetExecutionsCleanup = function (buildingNameEng) {
  return {
    type: TYPES.BUDGET_EXECUTIONS_CLEANUP,
    buildingNameEng
  }
}

const removeBudgetExecutionInStore = (buildingNameEng, index) => {
  return {
    type: TYPES.BUDGET_EXECUTIONS_DELETE,
    buildingNameEng,
    index
  }
}

export const deleteBudgetExecution = (buildingNameEng, date, index, rollbackData) => {
  return dispatch => {
    const rollbackDataCopy = { ...rollbackData };
    dispatch(removeBudgetExecutionInStore(buildingNameEng, index));

    return ipcSendReceive({
      send: {
        channel: "delete-budget-execution",
        params: { buildingNameEng, date, id: rollbackData.id }
      },
      receive: {
        channel: "budget-execution-deleted"
      },
      onSuccess: () => toastManager.success("השורה נמחקה בהצלחה."),
      onError: (result) => {
        dispatch(addBudgetExecutionInStore(buildingNameEng, rollbackDataCopy, sortByCode));
      }
    });
  }
};

const addBudgetExecutionInStore = (buildingNameEng, payload, compareFunc) => {
  return {
    type: TYPES.BUDGET_EXECUTIONS_ADD,
    buildingNameEng,
    payload,
    compareFunc
  }
}

export const addBudgetExecution = (params = Object) => {
  return dispatch => {
    return ipcSendReceive({
      send: {
        channel: "add-budget-execution",
        params
      },
      receive: {
        channel: "budget-execution-added"
      },
      onSuccess: (result) => {
        const { buildingNameEng } = params;
        dispatch(addBudgetExecutionInStore(buildingNameEng, result.data, sortByCode));

        toastManager.success("השורה נוספה בהצלחה.");
      }
    });
  }
};

export const updateBudgetExecutionStoreOnly = (payload, index, buildingNameEng) => {
  return {
    type: TYPES.BUDGET_EXECUTIONS_UPDATE,
    payload,
    index,
    buildingNameEng
  }
}

export const updateBudgetExecution = (params = Object, oldBudgetExec = Object, newBudgetExec = Object, index = Number) => {
  return (dispatch, getState) => {
    const {
      pageName,
      buildingNameEng
    } = params;
    //get te state
    const state = getState();

    //stats of all months
    const monthlyStatsArr = [...state.monthlyStats[buildingNameEng].pages[pageName].data];

    let monthStatsIndex = null;

    //quarter total stats
    const quarterlyStatsData = { ...state.quarterlyStats[buildingNameEng].pages[pageName].data[0] };

    //copy for rollback
    const quarterStatsOld = { ...quarterlyStatsData };

    if (params.date.month) {

      for (let i = 0; i < monthlyStatsArr.length; i++) {
        if (monthlyStatsArr[i].month === params.date.monthHeb) {
          monthStatsIndex = i;
        }
      }

      //make a copy of month total object to avoid mutating the original
      const monthStatsObject = { ...monthlyStatsArr[monthStatsIndex] };

      //subtract the old month budge value from
      //total budget and then add the new month budget value
      monthStatsObject.income = monthStatsObject.income - oldBudgetExec[`${params.date.month}_budget`] + newBudgetExec[`${params.date.month}_budget`];

      //subtract the old quarter budget value from
      //total budget and then add the new quarter budget value
      quarterlyStatsData.income = quarterlyStatsData.income - oldBudgetExec["total_budget"] + newBudgetExec["total_budget"];

      //update month total
      dispatch(monthlyStatsActions.updateMonthStatsStoreOnly(buildingNameEng, pageName, monthStatsObject, monthStatsIndex));

      //update quarter total
      dispatch(quarterlyStatsActions.updateQuarterStatsStoreOnly(buildingNameEng, pageName, quarterlyStatsData));
    }

    //copy of the un-modified month total object for rollback
    const oldMonthStatsObj = { ...monthlyStatsArr[monthStatsIndex] };

    //create a a budget execution object
    //with full properties to be saved in the store
    const budgetExecStoreObj = {
      ...oldBudgetExec,
      ...newBudgetExec
    }

    //update the new data in the store first for
    //better and fast user experience
    dispatch(updateBudgetExecutionStoreOnly(budgetExecStoreObj, index, params.buildingNameEng));

    return ipcSendReceive({
      send: {
        channel: "update-budget-execution",
        params
      },
      receive: {
        channel: "budget-execution-updated",
      },
      onSuccess: () => dispatch(showSavedNotification()),
      onError: () => {
        //rollback to the old budget execution object
        dispatch(updateBudgetExecutionStoreOnly(oldBudgetExec, index, params.buildingNameEng));

        //rollback to the old month total stats
        dispatch(monthlyStatsActions.updateMonthStatsStoreOnly(oldMonthStatsObj, monthStatsIndex));

        //rollback to old quarter total
        dispatch(quarterlyStatsActions.updateQuarterStatsStoreOnly(quarterStatsOld));

      }
    });

  };
};

export const updateDate = function (buildingNameEng, date) {
  return {
    type: TYPES.BUDGET_EXECUTIONS_UPDATE_DATE,
    buildingNameEng,
    date
  }
}

export function sortByCode(a, b) {
  if (a.section < b.section) {
    return -1;
  }
  if (a.section > b.section) {
    return 1;
  }
  // a must be equal to b
  return 0;
}