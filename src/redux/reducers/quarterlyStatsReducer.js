import { TYPES } from '../actions/quarterlyStatsActions';
import { initBuildingState, setBuildingState } from '../reducers/util/util';

const initState = initBuildingState({
  isFetching: false,
  status: "",
  error: "",
  data: []
});

export default (state = initState, action) => {
  const { buildingName, pageName } = action;
  switch (action.type) {
    case TYPES.RECEIVE_QUARTERLY_STATS:
      return setBuildingState(buildingName, pageName, state, {
        isFetching: false,
        status: "success",
        data: action.data
      });
    case TYPES.REQUEST_QUARTERLY_STATS:
      return setBuildingState(buildingName, pageName, state, {
        isFetching: true
      });
    case TYPES.UPDATE_QUARTER_STATS_STORE_ONLY: {
      //create new array with the new object
      const newDataArray = [action.quarterStatsObj];
      return setBuildingState(buildingName, pageName, state, {
        data: newDataArray
      });
    }
    case TYPES.QUARTERLY_STATS_FETCHING_FAILED:
      return setBuildingState(buildingName, pageName, state, {
        status: "error",
        error: action.payload
      });
    case TYPES.CLEANUP_QUARTERLY_STATS:
      return setBuildingState(buildingName, pageName, state, {
        isFetching: false,
        status: "",
        error: "",
        data: []
      });
    default: return state;
  }
}