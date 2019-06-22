import MonthExpansesController from '../../../controllers/MonthExpansesController';

const updateMonthExpanseAction = (payload = Object, tableData = Array) => {
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

export default updateMonthExpanseAction;