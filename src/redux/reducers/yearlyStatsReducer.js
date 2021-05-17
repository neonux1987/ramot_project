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
  const { buildingId, pageName } = action;
  switch (action.type) {
    case TYPES.YEARLY_STATS_RECEIVE:
      return setBuildingState(buildingId, pageName, state, {
        isFetching: false,
        status: "success",
        data: action.data
      });
    case TYPES.YEARLY_STATS_REQUEST:
      return setBuildingState(buildingId, pageName, state, {
        isFetching: true
      });
    case TYPES.YEARLY_STATS_FETCHING_FAILED:
      return setBuildingState(buildingId, pageName, state, {
        status: "error",
        error: action.payload
      });
    case TYPES.YEARLY_STATS_CLEANUP:
      return setBuildingState(buildingId, pageName, state, {
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
    case TYPES.YEARLY_STATS_ADD_BUILDING_STATE:
      {
        const { buildingId } = action;
        let stateCopy = { ...state };
        stateCopy[buildingId] = {
          isFetching: false,
          status: "",
          error: "",
          data: []
        };

        return stateCopy;
      }
    default: return state;
  }
}

export default YearlyStatsReducer;