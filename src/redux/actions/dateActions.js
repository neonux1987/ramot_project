import Helper from "../../helpers/Helper";

// TYPES
export const TYPES = {
  DATE_UPDATE: "DATE_UPDATE",
  DATE_INIT_STATE: "DATE_INIT_STATE",
  DATE_CLEANUP: "DATE_CLEANUP",
  DATE_INIT_PAGE: "DATE_INIT_PAGE",
  DATE_INIT_BUILDING: "DATE_INIT_BUILDING"
}

export const initDateState = function (pageName, buildingName, initState = Helper.getCurrentDate()) {
  return dispatch => {
    dispatch({
      type: TYPES.DATE_INIT_PAGE,
      pageName
    });
    dispatch({
      type: TYPES.DATE_INIT_BUILDING,
      pageName,
      buildingName,
      initState
    });
  }
};

export const dateCleanup = function (pageName, buildingName) {
  return dispatch => {
    dispatch({
      type: TYPES.DATE_CLEANUP,
      pageName,
      buildingName
    });
  }
}

export const updateDate = (pageName, buildingName, date) => {
  console.log(date);
  return {
    type: TYPES.DATE_UPDATE,
    pageName,
    buildingName,
    date
  };
}

