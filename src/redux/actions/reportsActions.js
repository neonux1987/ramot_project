import { ipcRenderer } from "electron";
import { toastManager } from "../../toasts/toastManager";

// TYPES
export const TYPES = {
  SET_CHECKED: "SET_CHECKED",
  REPORTS_BUILDINGS_REQUEST: "REPORTS_BUILDINGS_REQUEST",
  REPORTS_BUILDINGS_RECEIVE: "REPORTS_BUILDINGS_RECEIVE",
  REPORTS_BUILDINGS_FETCHING_FAILED: "REPORTS_BUILDINGS_FETCHING_FAILED"
};

export const fetchBuildings = () => {
  return async (dispatch) => {
    //let react know that the fetching is started
    dispatch(requestBuildings());

    const { data, error } = await ipcRenderer.invoke(
      "get-buildings-by-status",
      {
        status: "פעיל"
      }
    );

    if (data) {
      const checkedBuildings = [];

      data.forEach((building) => {
        const { buildingName, buildingId } = building;

        checkedBuildings.push({
          buildingName,
          buildingId,
          isChecked: true
        });
      });

      dispatch(receiveBuildings(checkedBuildings));
    } else {
      dispatch(fetchingFailed(error));
      toastManager.error(error);
    }
  };
};

export const checkBuilding = (
  reportsType,
  buildingId,
  checked,
  checkedBuildings
) => {
  let isAllChecked = true;

  const copyArr = [...checkedBuildings];

  copyArr.forEach((building) => {
    if (building.buildingId === buildingId) building.isChecked = checked;

    if (building.isChecked === false) isAllChecked = false;
  });

  return setChecked(reportsType, isAllChecked, copyArr);
};

export const setAllChecked = (reportsType, isAllChecked, checkedBuildings) => {
  checkedBuildings.forEach((building) => (building.isChecked = isAllChecked));

  return setChecked(reportsType, isAllChecked, checkedBuildings);
};

const setChecked = (reportsType, isAllChecked, checkedBuildings) => {
  return {
    type: TYPES.SET_CHECKED,
    reportsType,
    isAllChecked,
    checkedBuildings
  };
};

const requestBuildings = function () {
  return {
    type: TYPES.REPORTS_BUILDINGS_REQUEST
  };
};

const receiveBuildings = function (data) {
  return {
    type: TYPES.REPORTS_BUILDINGS_RECEIVE,
    data: data
  };
};

const fetchingFailed = function (error) {
  return {
    type: TYPES.REPORTS_BUILDINGS_FETCHING_FAILED,
    error
  };
};
