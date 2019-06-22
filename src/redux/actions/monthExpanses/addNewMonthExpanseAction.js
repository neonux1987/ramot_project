import MonthExpansesController from '../../../controllers/MonthExpansesController';

const addNewMonthExpanseAction = (payload = Object, tableData = Array) => {
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

export default addNewMonthExpanseAction;