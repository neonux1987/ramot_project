import SummarizedSectionsController from '../../controllers/SummarizedSectionsController';

/**
 * get summarized sections
 * @param {*} payload 
 */
const getSummarizedSections = (payload = Object) => {
  return dispatch => {

    //important params that allows to pull the current data by
    //building name, current month and year.

    //get the building month expanses
    (new SummarizedSectionsController()).getAllSummarizedSections(payload, (result) => {
      dispatch({
        type: "GET_SUMMARIZED_SECTIONS",
        payload: result
      })
    });

  }
};

export default {
  getSummarizedSections
};