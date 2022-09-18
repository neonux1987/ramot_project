import { TYPES } from "../actions/reportsActions";

const initState = {
  excelReports: {
    checkedBuildings: [],
    isAllChecked: true
  },
  emptyReports: {
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
          checkedBuildings: action.data.map((a) => Object.assign({}, a)),
          isAllChecked: true
        },
        emptyReports: {
          ...state.emptyReports,
          checkedBuildings: [...action.data],
          isAllChecked: true
        }
      };
    case TYPES.REPORTS_BUILDINGS_REQUEST:
      return {
        ...state,
        isFetching: true
      };
    case TYPES.REPORTS_BUILDINGS_FETCHING_FAILED:
      return {
        ...state,
        status: "error",
        error: action.error
      };
    case TYPES.SET_CHECKED: {
      const { isAllChecked, checkedBuildings, reportsType } = action;
      return {
        ...state,
        [reportsType]: {
          checkedBuildings,
          isAllChecked
        }
      };
    }
    default:
      return state;
  }
};

export default reportsReducer;
