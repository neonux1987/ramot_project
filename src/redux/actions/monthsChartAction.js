export const TYPES = {
  MONTHS_CHART_UPDATE_DATE: "MONTHS_CHART_UPDATE_DATE",
  MONTHS_CHART_ADD_BUILDING_STATE: "MONTHS_CHART_ADD_BUILDING_STATE"
}

export const updateDate = (buildingId, date) => {
  return {
    type: TYPES.MONTHS_CHART_UPDATE_DATE,
    buildingId,
    date
  }
}

export const addBuildingState = (buildingId) => {
  return {
    type: TYPES.MONTHS_CHART_ADD_BUILDING_STATE,
    buildingId
  }
}

