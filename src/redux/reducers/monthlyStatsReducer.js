import { TYPES } from '../actions/monthlyStatsActions';
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
    case TYPES.RECEIVE_MONTHLY_STATS:
      return setBuildingState(buildingName, pageName, state, {
        isFetching: false,
        status: "success",
        data: action.data
      });
    case TYPES.REQUEST_MONTHLY_STATS:
      return setBuildingState(buildingName, pageName, state, {
        isFetching: true
      });
    case TYPES.UPDATE_MONTH_STATS_STORE_ONLY: {
      //copy the array
      const monthlyStatsArr = [...state.monthlyStats.data];
      //set the new object
      monthlyStatsArr[action.index] = action.monthStatsObj;

      return setBuildingState(buildingName, pageName, state, {
        data: monthlyStatsArr
      });
    }
    case TYPES.MONTHLY_STATS_FETCHING_FAILED:
      return setBuildingState(buildingName, pageName, state, {
        status: "error",
        error: action.payload
      });
    case TYPES.CLEANUP_MONTHLY_STATS:
      return setBuildingState(buildingName, pageName, state, {
        isFetching: false,
        status: "",
        error: "",
        data: []
      });
    default: return state;
  }
}