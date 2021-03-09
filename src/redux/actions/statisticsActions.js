export const TYPES = {
  STATISTICS_UPDATE_SELECTED_CHART: "STATISTICS_UPDATE_SELECTED_CHART"
}

export const updateSelectedChart = (buildingName, selectedChart) => {
  return {
    type: TYPES.STATISTICS_UPDATE_SELECTED_CHART,
    buildingName,
    selectedChart
  }
}

