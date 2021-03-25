import { TYPES } from '../actions/reportsActions';
import { getBuildings } from './util/util';

const buildings = getBuildings();

const checkedBuildings = []

buildings.forEach(building => {
  const { label, engLabel } = building;

  checkedBuildings.push({
    buildingName: label,
    buildingNameEng: engLabel,
    isChecked: true
  });
});

const initState = {
  excelReports: {
    checkedBuildings,
    isAllChecked: true
  }
};

const reportsReducer = (state = initState, action) => {
  switch (action.type) {
    case TYPES.EXCEL_REPORTS_CHECK_BUILDING: {
      const { isAllChecked, checkedBuildings } = action;
      return {
        ...state,
        excelReports: {
          checkedBuildings,
          isAllChecked
        }
      };
    }
    case TYPES.EXCEL_REPORTS_SET_ALL_CHECKED: {
      const { isAllChecked, checkedBuildings } = action;
      return {
        ...state,
        excelReports: {
          checkedBuildings,
          isAllChecked
        }
      }
    }
    default: return state;
  }
}

export default reportsReducer;