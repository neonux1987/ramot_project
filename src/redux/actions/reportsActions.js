// TYPES
export const TYPES = {
  EXCEL_REPORTS_CHECK_BUILDING: "EXCEL_REPORTS_CHECK_BUILDING",
  EXCEL_REPORTS_SET_ALL_CHECKED: "EXCEL_REPORTS_SET_ALL_CHECKED",
  EMPTY_REPORTS_CHECK_BUILDING: "EMPTY_REPORTS_CHECK_BUILDING",
  EMPTY_REPORTS_SET_ALL_CHECKED: "EMPTY_REPORTS_SET_ALL_CHECKED"
}

export const checkBuilding = (type, buildingId, checked, checkedBuildings) => {

  let isAllChecked = true;

  checkedBuildings.forEach(building => {
    if (building.buildingId === buildingId)
      building.isChecked = checked;

    if (building.isChecked === false)
      isAllChecked = false;
  })

  return {
    type: type === "excel" ? TYPES.EXCEL_REPORTS_CHECK_BUILDING : TYPES.EMPTY_REPORTS_CHECK_BUILDING,
    buildingId,
    checkedBuildings,
    isAllChecked
  };
}

export const setAllChecked = (type, isAllChecked, checkedBuildings) => {
  checkedBuildings.forEach(building => building.isChecked = isAllChecked);

  return {
    type: type === "excel" ? TYPES.EXCEL_REPORTS_SET_ALL_CHECKED : TYPES.EMPTY_REPORTS_SET_ALL_CHECKED,
    isAllChecked,
    checkedBuildings
  };
}