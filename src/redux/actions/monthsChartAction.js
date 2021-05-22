export const TYPES = {
  MONTHS_CHART_UPDATE_DATE: "MONTHS_CHART_UPDATE_DATE",
  MONTHS_CHART_ADD_BUILDING_STATE: "MONTHS_CHART_ADD_BUILDING_STATE",
  MONTHS_CHART_REMOVE_BUILDING_STATE: "MONTHS_CHART_REMOVE_BUILDING_STATE"
}

export const updateDate = (buildingId, date) => {
  return {
    type: TYPES.MONTHS_CHART_UPDATE_DATE,
    buildingId,
    date
  }
}

export const addBuilding = (buildingId) => {
  return dispatch => dispatch({
    type: TYPES.MONTHS_CHART_ADD_BUILDING_STATE,
    buildingId
  });
}

export const removeBuilding = (buildingId) => {
  return dispatch => dispatch({
    type: TYPES.MONTHS_CHART_REMOVE_BUILDING_STATE,
    buildingId
  });
}

