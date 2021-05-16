import { ipcSendReceive } from "./util/util";

// TYPES
export const TYPES = {
  EXCEL_REPORTS_CHECK_BUILDING: "EXCEL_REPORTS_CHECK_BUILDING",
  EXCEL_REPORTS_SET_ALL_CHECKED: "EXCEL_REPORTS_SET_ALL_CHECKED",
  EMPTY_REPORTS_CHECK_BUILDING: "EMPTY_REPORTS_CHECK_BUILDING",
  EMPTY_REPORTS_SET_ALL_CHECKED: "EMPTY_REPORTS_SET_ALL_CHECKED",
  REPORTS_BUILDINGS_REQUEST: "REPORTS_BUILDINGS_REQUEST",
  REPORTS_BUILDINGS_RECEIVE: "REPORTS_BUILDINGS_RECEIVE",
  REPORTS_BUILDINGS_FETCHING_FAILED: "REPORTS_BUILDINGS_FETCHING_FAILED"
}

export const fetchBuildings = () => {

  return dispatch => {

    //let react know that the fetching is started
    dispatch(requestBuildings());

    return ipcSendReceive({
      send: {
        channel: "get-buildings-by-status",
        params: { status: "פעיל" }
      },
      receive: {
        channel: "by-status-buildings-data"
      },
      onSuccess: result => {
        const checkedBuildings = []

        result.data.forEach(building => {
          const { buildingName, buildingId } = building;

          checkedBuildings.push({
            buildingName,
            buildingId,
            isChecked: true
          });
        });

        dispatch(receiveBuildings(checkedBuildings))
      },
      onError: result => dispatch(fetchingFailed(result.error))
    });

  }
};

export const checkBuilding = (type, buildingId, checked, checkedBuildings) => {

  let isAllChecked = true;

  checkedBuildings.forEach(building => {
    if (building.buildingId === buildingId)
      building.isChecked = checked;

    if (building.isChecked === false)
      isAllChecked = false;
  })

  return {
    type: type === "excel" ? TYPES.EXCEL_REPORTS_CHECK_BUILDING : TYPES.EMPTY_REPORTS_CHECK_BUILDING,
    buildingId,
    checkedBuildings,
    isAllChecked
  };
}

export const setAllChecked = (type, isAllChecked, checkedBuildings) => {
  checkedBuildings.forEach(building => building.isChecked = isAllChecked);

  return {
    type: type === "excel" ? TYPES.EXCEL_REPORTS_SET_ALL_CHECKED : TYPES.EMPTY_REPORTS_SET_ALL_CHECKED,
    isAllChecked,
    checkedBuildings
  };
}

const requestBuildings = function () {
  return {
    type: TYPES.REPORTS_BUILDINGS_REQUEST
  }
};

const receiveBuildings = function (data) {
  return {
    type: TYPES.REPORTS_BUILDINGS_RECEIVE,
    data: data
  }
}

const fetchingFailed = function (error) {
  return {
    type: TYPES.REPORTS_BUILDINGS_FETCHING_FAILED,
    error
  }
};