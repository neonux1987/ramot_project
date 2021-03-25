// TYPES
export const TYPES = {
  EXCEL_REPORTS_CHECK_BUILDING: "EXCEL_REPORTS_CHECK_BUILDING",
  EXCEL_REPORTS_SET_ALL_CHECKED: "EXCEL_REPORTS_SET_ALL_CHECKED"
}

export const checkBuilding = (buildingNameEng, checked, checkedBuildings) => {

  let isAllChecked = true;

  checkedBuildings.forEach(building => {
    if (building.buildingNameEng === buildingNameEng)
      building.isChecked = checked;

    if (building.isChecked === false)
      isAllChecked = false;
  })

  return {
    type: TYPES.EXCEL_REPORTS_CHECK_BUILDING,
    buildingNameEng,
    checkedBuildings,
    isAllChecked
  };
}

export const setAllChecked = (isAllChecked, checkedBuildings) => {
  checkedBuildings.forEach(building => building.isChecked = isAllChecked);

  return {
    type: TYPES.EXCEL_REPORTS_SET_ALL_CHECKED,
    isAllChecked,
    checkedBuildings
  };
}