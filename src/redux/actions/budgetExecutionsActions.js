import * as monthlyStatsActions from './monthlyStatsActions';
import * as quarterlyStatsActions from './quarterlyStatsActions';
import { ipcSendReceive } from './util/util';
import { myToasts } from '../../CustomToasts/myToasts';

// TYPES
export const TYPES = {
  BUDGET_EXECUTIONS_REQUEST: "BUDGET_EXECUTIONS_REQUEST",
  BUDGET_EXECUTIONS_RECEIVE: "BUDGET_EXECUTIONS_RECEIVE",
  BUDGET_EXECUTIONS_FETCHING_FAILED: "BUDGET_EXECUTIONS_FETCHING_FAILED",
  BUDGET_EXECUTIONS_UPDATE: "BUDGET_EXECUTIONS_UPDATE",
  BUDGET_EXECUTIONS_ADD: "BUDGET_EXECUTIONS_ADD",
  BUDGET_EXECUTIONS_DELETE: "BUDGET_EXECUTIONS_DELETE",
  BUDGET_EXECUTIONS_INIT_STATE: "BUDGET_EXECUTIONS_INIT_STATE",
  BUDGET_EXECUTIONS_CLEANUP: "BUDGET_EXECUTIONS_CLEANUP"
}

export const fetchBudgetExecutions = (buildingInfo, date, range) => {
  return dispatch => {
    const { buildingName } = buildingInfo;

    //let react know that the fetching is started
    dispatch(requestBudgetExecutions(buildingName));

    return ipcSendReceive({
      send: {
        channel: "get-budget-executions",
        params: { buildingInfo, date, range }
      },
      receive: {
        channel: "budget-executions",
      },
      onSuccess: (result) => {
        dispatch(receiveBudgetExecutions([], buildingName));

        //success store the data
        dispatch(receiveBudgetExecutions(result.data.data, buildingName));
      },
      onError: (result) => {
        dispatch(budgetExecutionsFetchingFailed(result.error, buildingName));
      }
    });

  }
};

const requestBudgetExecutions = function (buildingName) {
  return {
    type: TYPES.BUDGET_EXECUTIONS_REQUEST,
    buildingName
  }
};

const receiveBudgetExecutions = function (data, buildingName) {
  return {
    type: TYPES.BUDGET_EXECUTIONS_RECEIVE,
    data,
    buildingName
  }
}

const budgetExecutionsFetchingFailed = function (error, buildingName) {
  return {
    type: TYPES.BUDGET_EXECUTIONS_FETCHING_FAILED,
    error,
    buildingName
  }
};

export const initBudgetExecutionsState = function (buildingName) {
  return dispatch => {
    return new Promise((resolve, reject) => {
      if (buildingName) {
        dispatch(setInitialBudgetExecutionsState(buildingName));
        resolve();
      } else {
        reject("page canot be empty/undefined or null");
      }
    });
  };
};

const setInitialBudgetExecutionsState = function (buildingName) {
  return dispatch => {
    dispatch({
      type: TYPES.BUDGET_EXECUTIONS_INIT_STATE,
      buildingName
    });
  }
};

export const budgetExecutionsCleanup = function (buildingName) {
  return {
    type: TYPES.BUDGET_EXECUTIONS_CLEANUP,
    buildingName
  }
}

const removeBudgetExecutionInStore = (buildingName, index) => {
  return {
    type: TYPES.BUDGET_EXECUTIONS_DELETE,
    buildingName,
    index
  }
}

export const deleteBudgetExecution = (buildingName, date, index, rollbackData) => {
  return dispatch => {
    const rollbackDataCopy = { ...rollbackData };
    dispatch(removeBudgetExecutionInStore(buildingName, index));

    return ipcSendReceive({
      send: {
        channel: "delete-budget-execution",
        params: { buildingName, date, id: rollbackData.id }
      },
      receive: {
        channel: "budget-execution-deleted"
      },
      onSuccess: () => myToasts.success("השורה נמחקה בהצלחה."),
      onError: (result) => {
        dispatch(addBudgetExecutionInStore(buildingName, rollbackDataCopy, sortByCode));
      }
    });
  }
};

const addBudgetExecutionInStore = (buildingName, payload, compareFunc) => {
  return {
    type: TYPES.BUDGET_EXECUTIONS_ADD,
    buildingName,
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
        const { buildingName } = params;
        dispatch(addBudgetExecutionInStore(buildingName, result.data, sortByCode));

        myToasts.success("השורה נוספה בהצלחה.");
      }
    });
  }
};

export const updateBudgetExecutionStoreOnly = (payload, index, buildingName) => {
  return {
    type: TYPES.BUDGET_EXECUTIONS_UPDATE,
    payload,
    index,
    buildingName
  }
}

export const updateBudgetExecution = (params = Object, oldBudgetExec = Object, newBudgetExec = Object, index = Number) => {
  return (dispatch, getState) => {

    //get te state
    const state = getState();

    //stats of all months
    const monthlyStatsArr = [...state.monthlyStats.monthlyStats.data];

    let monthStatsIndex = null;

    //quarter total stats
    const quarterlyStatsData = { ...state.quarterlyStats.quarterlyStats.data[0] };

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
      dispatch(monthlyStatsActions.updateMonthStatsStoreOnly(monthStatsObject, monthStatsIndex));

      //update quarter total
      dispatch(quarterlyStatsActions.updateQuarterStatsStoreOnly(quarterlyStatsData));
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
    dispatch(updateBudgetExecutionStoreOnly(budgetExecStoreObj, index, params.buildingName));

    return ipcSendReceive({
      send: {
        channel: "update-budget-execution",
        params
      },
      receive: {
        channel: "budget-execution-updated",
      },
      onSuccess: () => myToasts.success("השורה עודכנה בהצלחה."),
      onError: () => {
        //rollback to the old budget execution object
        dispatch(updateBudgetExecutionStoreOnly(oldBudgetExec, index, params.buildingName));

        //rollback to the old month total stats
        dispatch(monthlyStatsActions.updateMonthStatsStoreOnly(oldMonthStatsObj, monthStatsIndex));

        //rollback to old quarter total
        dispatch(quarterlyStatsActions.updateQuarterStatsStoreOnly(quarterStatsOld));

      }
    });

  };
};

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