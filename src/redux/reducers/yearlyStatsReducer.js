import { TYPES } from '../actions/yearlyStatsActions';
import { initBuildingState, setBuildingState } from '../reducers/util/util';

const buildingsState = initBuildingState({
  isFetching: false,
  status: "",
  error: "",
  data: []
});

const initState = {
  ...buildingsState,
  all: {
    isFetching: false,
    status: "",
    error: "",
    data: []
  }
};

const YearlyStatsReducer = (state = initState, action) => {
  const { buildingName, pageName } = action;
  switch (action.type) {
    case TYPES.YEARLY_STATS_RECEIVE:
      return setBuildingState(buildingName, pageName, state, {
        isFetching: false,
        status: "success",
        data: action.data
      });
    case TYPES.YEARLY_STATS_REQUEST:
      return setBuildingState(buildingName, pageName, state, {
        isFetching: true
      });
    case TYPES.YEARLY_STATS_FETCHING_FAILED:
      return setBuildingState(buildingName, pageName, state, {
        status: "error",
        error: action.payload
      });
    case TYPES.YEARLY_STATS_CLEANUP:
      return setBuildingState(buildingName, pageName, state, {
        isFetching: false,
        status: "",
        error: "",
        data: []
      });
    case TYPES.All_BUILDINGS_STATS_RECEIVE:
      return {
        ...state,
        all: {
          ...state.all,
          isFetching: false,
          status: "success",
          data: action.data
        }
      };
    case TYPES.All_BUILDINGS_STATS_REQUEST:
      return {
        ...state,
        all: {
          ...state.all,
          isFetching: true
        }
      }
    case TYPES.All_BUILDINGS_STATS_FETCHING_FAILED:
      return {
        ...state,
        all: {
          ...state.all,
          status: "error",
          error: action.payload
        }
      }
    case TYPES.All_BUILDINGS_STATS_CLEANUP:
      return {
        ...state,
        all: {
          ...state.all,
          isFetching: false,
          status: "",
          error: "",
          data: []
        }
      }
    default: return state;
  }
}

export default YearlyStatsReducer;