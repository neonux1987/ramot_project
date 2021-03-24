import { TYPES } from '../actions/reportsActions';
import { getBuildings } from './util/util';

const buildings = getBuildings();

const chosenBuildings = {}

buildings.forEach(building => {
  const { label, engLabel } = building;

  chosenBuildings[engLabel] = {
    buildingName: label,
    buildingNameEng: engLabel,
    checked: true
  }
});

const initState = {
  excelReports: {
    chosenBuildings,
    all: true
  }
};

const reportsReducer = (state = initState, action) => {
  switch (action.type) {
    case TYPES.EXCEL_REPORTS_UPDATE_CHECKED_BUILDING: {
      const { buildingNameEng, checked } = action;

      const newState = {
        ...state,
        excelReports: {
          ...state.excelReports,
          chosenBuildings: {
            ...state.excelReports.chosenBuildings,
            [buildingNameEng]: {
              ...state.excelReports.chosenBuildings[buildingNameEng],
              checked
            }
          }
        }
      };

      return newState;
    }
    case TYPES.EXCEL_REPORTS_SET_ALL: {
      return {
        ...state,
        excelReports: {
          ...state.excelReports,
          all: action.status
        }
      }
    }
    default: return state;
  }
}

export default reportsReducer;