import MonthExpansesController from '../../../controllers/MonthExpansesController';
import updateDateAction from '../date/updateDateAction';

const getMonthExpansesDataAction = (payload = Object) => {
  return dispatch => {

    //important params that allows to pull the current data by
    //building name, current month and year.

    //get the building month expanses
    (new MonthExpansesController()).getAllMonthExpanses(payload, (result) => {

      //add empty row for the ability to add new data
      /* for (let i = 0; i < 10; i++) {
        result.push({
          code: null,
          codeName: "",
          expanses_code_id: null,
          id: null,
          month: null,
          notes: "",
          section: "",
          sum: null,
          summarized_section_id: null,
          supplierName: "",
          year: null
        });
      } */

      dispatch({
        type: "GET_MONTH_EXPANSES",
        payload: result
      })

      dispatch(updateDateAction(payload));

    });

  }
};

export default getMonthExpansesDataAction;