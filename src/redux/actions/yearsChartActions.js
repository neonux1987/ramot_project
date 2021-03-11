export const TYPES = {
  YEARS_CHART_UPDATE_DATE: "YEARS_CHART_UPDATE_DATE"
}

export const updateDate = (buildingName, date) => {
  return {
    type: TYPES.YEARS_CHART_UPDATE_DATE,
    buildingName,
    date
  }
}

