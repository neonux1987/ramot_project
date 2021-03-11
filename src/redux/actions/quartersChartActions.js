export const TYPES = {
  QUARTERS_CHART_UPDATE_DATE: "QUARTERS_CHART_UPDATE_DATE"
}

export const updateDate = (buildingName, date) => {
  return {
    type: TYPES.QUARTERS_CHART_UPDATE_DATE,
    buildingName,
    date
  }
}

