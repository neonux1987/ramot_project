export const TYPES = {
  QUARTERS_CHART_UPDATE_DATE: "QUARTERS_CHART_UPDATE_DATE",
  QUARTERS_CHART_ADD_BUILDING_STATE: "QUARTERS_CHART_ADD_BUILDING_STATE",
  QUARTERS_CHART_REMOVE_BUILDING_STATE: "QUARTERS_CHART_REMOVE_BUILDING_STATE"
}

export const updateDate = (buildingId, date) => {
  return {
    type: TYPES.QUARTERS_CHART_UPDATE_DATE,
    buildingId,
    date
  }
}

export const addBuilding = (buildingId) => {
  return dispatch => dispatch({
    type: TYPES.QUARTERS_CHART_ADD_BUILDING_STATE,
    buildingId
  });
}

export const removeBuilding = (buildingId) => {
  return dispatch => dispatch({
    type: TYPES.QUARTERS_CHART_REMOVE_BUILDING_STATE,
    buildingId
  });
}
