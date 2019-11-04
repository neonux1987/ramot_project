import { ipcRenderer } from 'electron';
import React from 'react';
import { playSound, soundTypes } from '../../audioPlayer/audioPlayer';
import registeredQuartersActions from './registeredQuartersActions';
import registeredYearsActions from './registeredYearsActions';
import { toast } from 'react-toastify';
import ToastRender from '../../components/ToastRender/ToastRender';
import monthTotalActions from './monthTotalActions';
import quarterTotalActions from './quarterTotalActions';

const TOAST_AUTO_CLOSE = 3000;

/**
 * fetch month expanses
 * @param {*} params 
 */
const fetchBudgetExecutions = (params = Object) => {
  return dispatch => {

    //let react know that the fetching is started
    dispatch(requestBudgetExecutions(params.buildingName));

    //request request to backend to get the data
    ipcRenderer.send("get-budget-execution-data", params);
    //listen when the data comes back
    ipcRenderer.once("budget-execution-data", (event, arg) => {
      if (arg.error) {
        //let react know that an erro occured while trying to fetch
        dispatch(fetchingFailed(arg.error));
        //send the error to the notification center
        toast.error(arg.error, {
          onOpen: () => playSound(soundTypes.error)
        });
      } else {
        //if there is no data, that means it's a new month and 
        //and empty report should be generated.
        if (arg.data.length === 0) {
          //show a notification that the generation of 
          generateEmptyReport(params, dispatch);
        }
        //success store the data
        dispatch(receiveBudgetExecutions(arg.data, params.buildingName, params.date));
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
          dispatch(fetchingFailed(arg.error));
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
        }
      });

    }
  });
}

const requestBudgetExecutions = function (page) {
  return {
    type: "REQUEST_BUDGET_EXECUTIONS",
    page
  }
};

const receiveBudgetExecutions = function (data, page, date) {
  return {
    type: "RECEIVE_BUDGET_EXECUTIONS",
    data,
    page,
    date
  }
}

const fetchingFailed = function (error) {
  return {
    type: "BUDGET_EXECUTION_FETCHING_FAILED",
    error
  }
};

/**
 * init the state
 */
const initState = function (page) {
  return dispatch => {
    return new Promise((resolve, reject) => {
      if (page) {
        dispatch(setInitialState(page));
        resolve();
      } else {
        reject("page canot be empty/undefined or null");
      }
    });
  };
};

const setInitialState = function (page) {
  return dispatch => {
    dispatch({
      type: "INIT_STATE",
      page: page
    });
  }
};

const cleanup = function (buldingNameEng) {
  return {
    type: "CLEANUP",
    page: buldingNameEng
  }
}

/**
 * add budget execution
 * @param {*} params 
 * @param {*} tableData 
 */
const addBudgetExecution = (params = Object, tableData) => {
  return dispatch => {
    //send a request to backend to get the data
    ipcRenderer.send("add-new-month-expanse", params);
    //listen when the data comes back
    ipcRenderer.once("month-expanse-added", () => {
      dispatch(receiveBudgetExecutions(tableData, params.buildingName));
    });
  }
};

const updateSingleBudgetExecution = (newBudgetExecution, index) => {
  return {
    type: "UPDATE_SINGLE_BUDGET_EXECUTION",
    newBudgetExecution,
    index
  }
}

/**
 * update budget execution
 * @param {*} payload 
 * @param {*} tableData 
 */
const updateBudgetExecution = (params = Object, oldBudgetExec = Object, newBudgetExec = Object, index = Number) => {
  return (dispatch, getState) => {

    //get te state
    const state = getState();

    //stats of all months
    const monthTotalDataArr = [...state.monthTotal.monthTotal.data];

    let monthTotalIndex = null;

    //quarter total stats
    const quarterTotalData = { ...state.quarterTotal.quarterTotal.data[0] };

    if (params.date.month) {

      for (let i = 0; i < monthTotalDataArr.length; i++) {
        if (monthTotalDataArr[i].month === params.date.month) {
          monthTotalIndex = i;
        }
      }

      const monthTotalObject = { ...monthTotalDataArr[monthTotalIndex] };

      //subtract the old month budge value from
      //total budget and then add the new month budget value
      monthTotalObject.income = monthTotalObject.income - oldBudgetExec[`${params.date.month}_budget`] + newBudgetExec[`${params.date.month}_budget`];

      //subtract the old quarter budget value from
      //total budget and then add the new quarter budget value
      quarterTotalData.income = quarterTotalData.income - oldBudgetExec["total_budget"] + newBudgetExec["total_budget"];

      dispatch(monthTotalActions.updateSingleMonthTotal(monthTotalObject, monthTotalIndex));

    }



    //create a a budget execution object
    //with full properties to be saved in the store
    const budgetExecStoreObj = {
      ...oldBudgetExec,
      ...newBudgetExec
    }

    //update the new data in the store first for
    //better and fast user experience
    dispatch(updateSingleBudgetExecution(budgetExecStoreObj, index));

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
        dispatch(updateSingleBudgetExecution(oldBudgetExec, index));
      } else {

        toast.success("השורה עודכנה בהצלחה.", {
          onOpen: () => playSound(soundTypes.message)
        });
      }
    });
  };
};

export default {
  fetchBudgetExecutions,
  addBudgetExecution,
  updateBudgetExecution,
  fetchingFailed,
  receiveBudgetExecutions,
  requestBudgetExecutions,
  initState,
  cleanup
};