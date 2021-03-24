import { getBuildings } from "../reducers/util/util";

// TYPES
export const TYPES = {
  EXCEL_REPORTS_UPDATE_CHECKED_BUILDING: "EXCEL_REPORTS_UPDATE_CHECKED_BUILDING",
  EXCEL_REPORTS_SET_ALL: "EXCEL_REPORTS_SET_ALL"
}

export const updateCheckedBuilding = (buildingNameEng, checked) => {
  return {
    type: TYPES.EXCEL_REPORTS_UPDATE_CHECKED_BUILDING,
    buildingNameEng,
    checked
  };
}

export const setAll = (status) => {
  return (dispatch, getState) => {

    const state = getState().reports.excelReports;
    console.log(state);

    dispatch({
      type: TYPES.EXCEL_REPORTS_SET_ALL,
      status
    });
  }
}