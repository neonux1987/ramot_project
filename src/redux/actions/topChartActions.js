export const TYPES = {
  TOP_CHART_UPDATE_DATE: "TOP_CHART_UPDATE_DATE"
}

export const updateDate = (buildingName, date) => {
  return {
    type: TYPES.TOP_CHART_UPDATE_DATE,
    buildingName,
    date
  }
}

