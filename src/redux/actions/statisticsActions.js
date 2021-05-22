export const TYPES = {
  STATISTICS_UPDATE_SELECTED_CHART: "STATISTICS_UPDATE_SELECTED_CHART",
  STATISTICS_ADD_BUILDING_STATE: "STATISTICS_ADD_BUILDING_STATE"
}

export const updateSelectedChart = (buildingName, selectedChart) => {
  return {
    type: TYPES.STATISTICS_UPDATE_SELECTED_CHART,
    buildingName,
    selectedChart
  }
}

export const addBuildingState = (buildingId) => {
  return {
    type: TYPES.STATISTICS_ADD_BUILDING_STATE,
    buildingId
  }
}
