import { TYPES } from '../actions/reportsActions';

const initState = {
  excelReports: {
    checkedBuildings: [],
    isAllChecked: true
  },
  isFetching: true,
  status: "",
  error: ""
};

const reportsReducer = (state = initState, action) => {
  switch (action.type) {
    case TYPES.REPORTS_BUILDINGS_RECEIVE:
      return {
        ...state,
        isFetching: false,
        status: "success",
        excelReports: {
          ...state.excelReports,
          checkedBuildings: action.data
        }
      }
    case TYPES.REPORTS_BUILDINGS_REQUEST:
      return {
        ...state,
        isFetching: true,
      }
    case TYPES.REPORTS_BUILDINGS_FETCHING_FAILED:
      return {
        ...state,
        status: "error",
        error: action.error
      }
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