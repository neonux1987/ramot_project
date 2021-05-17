export const TYPES = {
  YEARS_CHART_UPDATE_DATE: "YEARS_CHART_UPDATE_DATE",
  YEARS_CHART_ADD_BUILDING_STATE: "YEARS_CHART_ADD_BUILDING_STATE"
}

export const updateDate = (buildingId, date) => {
  return {
    type: TYPES.YEARS_CHART_UPDATE_DATE,
    buildingId,
    date
  }
}

export const addBuildingState = (buildingId) => {
  return {
    type: TYPES.YEARS_CHART_ADD_BUILDING_STATE,
    buildingId
  }
}

