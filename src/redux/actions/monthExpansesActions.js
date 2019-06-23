import MonthExpansesController from '../../controllers/MonthExpansesController';
import dateActions from './dateActions';

/**
 * fetch month expanses
 * @param {*} payload 
 */
const getMonthExpanses = (payload = Object) => {
  return dispatch => {

    //important params that allows to pull the current data by
    //building name, current month and year.

    //get the building month expanses
    (new MonthExpansesController()).getAllMonthExpanses(payload, (result) => {

      dispatch({
        type: "GET_MONTH_EXPANSES",
        payload: result
      })

      dispatch(dateActions.updateDate(payload));

    });

  }
};

/**
 * add new month expanse
 * @param {*} payload 
 * @param {*} tableData 
 */
const addNewMonthExpanse = (payload = Object, tableData = Array) => {
  return dispatch => {

    //update expanse
    (new MonthExpansesController()).addNewMonthExpanse(payload, (result) => {
      dispatch({
        type: "ADD_NEW_MONTH_EXPANSES",
        payload: tableData
      })
    });

  }
};

/**
 * update month expanse
 * @param {*} payload 
 * @param {*} tableData 
 */
const updateMonthExpanse = (payload = Object, tableData = Array) => {
  return dispatch => {

    //update expanse
    (new MonthExpansesController()).updateMonthExpanse(payload, (result) => {
      dispatch({
        type: "UPDATE_MONTH_EXPANSES",
        payload: tableData
      })
    });

  }
};

export default {
  getMonthExpanses,
  addNewMonthExpanse,
  updateMonthExpanse
};