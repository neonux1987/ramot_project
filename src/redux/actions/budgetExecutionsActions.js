import { ipcRenderer } from 'electron';
import React from 'react';
import { playSound, soundTypes } from '../../audioPlayer/audioPlayer';
import registeredQuartersActions from './registeredQuartersActions';
import registeredYearsActions from './registeredYearsActions';
import { toast } from 'react-toastify';
import ToastRender from '../../components/ToastRender/ToastRender';
import monthlyStatsActions from './monthlyStatsActions';
import quarterlyStatsActions from './quarterlyStatsActions';
import { ipcSendReceive } from './util/util';

const TOAST_AUTO_CLOSE = 3000;

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

export const fetchBudgetExecutions = (params = Object) => {
  return dispatch => {
    //let react know that the fetching is started
    dispatch(requestBudgetExecutions(params.buildingName));

    //request request to backend to get the data
    ipcRenderer.send("get-budget-executions", params);
    //listen when the data comes back
    ipcRenderer.once("budget-executions", (event, arg) => {
      if (arg.error) {
        //let react know that an erro occured while trying to fetch
        dispatch(budgetExecutionsFetchingFailed(arg.error, params.buildingName));
        //send the error to the notification center
        toast.error(arg.error, {
          onOpen: () => playSound(soundTypes.error)
        });
      } else {
        //if there is no data, that means it's a new month and 
        //and empty report should be generated.
        if (arg.data.data.length === 0) {
          //show a notification that the generation of 
          //generateEmptyReport(params, dispatch);
          dispatch(receiveBudgetExecutions([], params.buildingName));
        }

        //success store the data
        dispatch(receiveBudgetExecutions(arg.data.data, params.buildingName));
      }
    });

  }
};

const generateEmptyReport = (params, dispatch) => {
  //empty report process started
  const toastId = toast.info(<ToastRender spinner={true} message={"מייצר דוח רבעוני חדש..."} />, {
    autoClose: false,
    onOpen: () => playSound(soundTypes.message)
  });
  //request request to backend to get the data
  ipcRenderer.send("generate-budget-execution-report", params);
  return ipcRenderer.once("generated-budget-execution-data", (event, arg) => {
    if (arg.error) {
      playSound(soundTypes.error);
      //empty report process finished
      toast.update(toastId, {
        render: <ToastRender done={true} message={arg.error} />,
        type: toast.TYPE.ERROR,
        delay: 2000,
        autoClose: TOAST_AUTO_CLOSE,
        onClose: () => {
          //let react know that an erro occured while trying to fetch
          dispatch(budgetExecutionsFetchingFailed(arg.error, params.buildingName));
        }
      });
    } else {
      //empty report process finished
      toast.update(toastId, {
        render: <ToastRender done={true} message={"דוח רבעוני חדש נוצר בהצלחה."} />,
        type: toast.TYPE.SUCCESS,
        autoClose: TOAST_AUTO_CLOSE,
        delay: 2000,
        onClose: () => {
          //success store the data
          dispatch(receiveBudgetExecutions(arg.data, params.buildingName));
          dispatch(registeredQuartersActions.fetchRegisteredQuarters(params));
          dispatch(registeredYearsActions.fetchRegisteredYears(params));
          dispatch(monthlyStatsActions.fetchAllMonthsStatsByQuarter(params));
          dispatch(quarterlyStatsActions.fetchQuarterStats(params));
        }
      });

    }
  });
}

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

const addBudgetExecutionInStore = (payload) => {
  return {
    type: TYPES.BUDGET_EXECUTIONS_ADD,
    payload
  }
}

const removeBudgetExecutionInStore = (payload) => {
  return {
    type: TYPES.BUDGET_EXECUTIONS_ADD,
    payload
  }
}

export const addBudgetExecution = (params = Object) => {
  return dispatch => {
    return ipcSendReceive("add-budget-execution", params, "budget-execution-added");
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

    return new Promise((resolve, reject) => {
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

      //send a request to backend to get the data
      ipcRenderer.send("update-budget-execution", params);

      //listen when the data comes back
      ipcRenderer.once("budget-execution-updated", (event, arg) => {
        if (arg.error) {
          //send the error to the notification center
          toast.error(arg.error, {
            onOpen: () => playSound(soundTypes.error)
          });

          //rollback to the old budget execution object
          dispatch(updateBudgetExecutionStoreOnly(oldBudgetExec, index, params.buildingName));

          //rollback to the old month total stats
          dispatch(monthlyStatsActions.updateMonthStatsStoreOnly(oldMonthStatsObj, monthStatsIndex));

          //rollback to old quarter total
          dispatch(quarterlyStatsActions.updateQuarterStatsStoreOnly(quarterStatsOld));
          reject();
        } else {
          toast.success("השורה עודכנה בהצלחה.", {
            onOpen: () => playSound(soundTypes.message)
          });
          resolve();
        }
      });
    })

  };
};

export const deleteBudgetExecution = (buildingName, date, id) => {
  return dispatch => {

    return new Promise((resolve, reject) => {
      //request request to backend to get the data
      ipcRenderer.send("delete-budget-execution", { buildingName, date, id });
      //listen when the data comes back
      ipcRenderer.once("budget-execution-deleted", (event, arg) => {
        if (arg.error) {
          reject(arg.error);
        } else {
          resolve();
        }
      });
    })

  }
};