import { TYPES } from '../actions/quarterlyStatsActions';
import { initBuildingState, setBuildingState } from '../reducers/util/util';

const initState = initBuildingState({
  isFetching: false,
  status: "",
  error: "",
  data: []
});

const quarterlyStatsReducer = (state = initState, action) => {
  const { buildingId, pageName } = action;
  switch (action.type) {
    case TYPES.RECEIVE_QUARTERLY_STATS:
      return setBuildingState(buildingId, pageName, state, {
        isFetching: false,
        status: "success",
        data: action.data
      });
    case TYPES.REQUEST_QUARTERLY_STATS:
      return setBuildingState(buildingId, pageName, state, {
        isFetching: true
      });
    case TYPES.UPDATE_QUARTER_STATS_STORE_ONLY: {
      //create new array with the new object
      const newDataArray = [action.quarterStatsObj];
      return setBuildingState(buildingId, pageName, state, {
        data: newDataArray
      });
    }
    case TYPES.QUARTERLY_STATS_FETCHING_FAILED:
      return setBuildingState(buildingId, pageName, state, {
        status: "error",
        error: action.payload
      });
    case TYPES.CLEANUP_QUARTERLY_STATS:
      return setBuildingState(buildingId, pageName, state, {
        isFetching: false,
        status: "",
        error: "",
        data: []
      });
    case TYPES.QUARTERLY_STATS_ADD_BUILDING_STATE:
      {
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

export default quarterlyStatsReducer;