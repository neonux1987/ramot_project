export const TYPES = {
  MONTHS_CHART_UPDATE_DATE: "MONTHS_CHART_UPDATE_DATE"
}

export const updateDate = (buildingName, date) => {
  console.log("da");
  return {
    type: TYPES.MONTHS_CHART_UPDATE_DATE,
    buildingName,
    date
  }
}

