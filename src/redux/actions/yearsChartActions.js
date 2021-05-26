export const TYPES = {
  YEARS_CHART_UPDATE_DATE: "YEARS_CHART_UPDATE_DATE",
  YEARS_CHART_ADD_BUILDING_STATE: "YEARS_CHART_ADD_BUILDING_STATE",
  YEARS_CHART_REMOVE_BUILDING_STATE: "YEARS_CHART_REMOVE_BUILDING_STATE"
}

export const updateDate = (buildingId, date) => {
  return {
    type: TYPES.YEARS_CHART_UPDATE_DATE,
    buildingId,
    date
  }
}

export const addBuilding = (buildingId) => {
  return {
    type: TYPES.YEARS_CHART_ADD_BUILDING_STATE,
    buildingId
  };
}

export const removeBuilding = (buildingId) => {
  return dispatch => dispatch({
    type: TYPES.YEARS_CHART_REMOVE_BUILDING_STATE,
    buildingId
  });
}

