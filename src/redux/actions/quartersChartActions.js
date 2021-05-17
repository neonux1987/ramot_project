export const TYPES = {
  QUARTERS_CHART_UPDATE_DATE: "QUARTERS_CHART_UPDATE_DATE",
  QUARTERS_CHART_ADD_BUILDING_STATE: "QUARTERS_CHART_ADD_BUILDING_STATE"
}

export const updateDate = (buildingId, date) => {
  return {
    type: TYPES.QUARTERS_CHART_UPDATE_DATE,
    buildingId,
    date
  }
}

export const addBuildingState = (buildingId) => {
  return {
    type: TYPES.QUARTERS_CHART_ADD_BUILDING_STATE,
    buildingId
  }
}