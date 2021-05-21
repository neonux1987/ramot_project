import { TYPES } from '../actions/monthlyStatsActions';
import { initBuildingState, setBuildingState, getPages } from '../reducers/util/util';

const initState = initBuildingState({
  isFetching: false,
  status: "",
  error: "",
  data: []
});

const monthlyStatsReducer = (state = initState, action) => {
  const { buildingId, pageName } = action;
  switch (action.type) {
    case TYPES.RECEIVE_MONTHLY_STATS:
      return setBuildingState(buildingId, pageName, state, {
        isFetching: false,
        status: "success",
        data: action.data
      });
    case TYPES.REQUEST_MONTHLY_STATS:
      return setBuildingState(buildingId, pageName, state, {
        isFetching: true
      });
    case TYPES.UPDATE_MONTH_STATS_STORE_ONLY: {
      //copy the array
      const monthlyStatsArr = [...state[buildingId].pages[pageName].data];
      //set the new object
      monthlyStatsArr[action.index] = action.monthStatsObj;

      return setBuildingState(buildingId, pageName, state, {
        data: monthlyStatsArr
      });
    }
    case TYPES.MONTHLY_STATS_FETCHING_FAILED:
      return setBuildingState(buildingId, pageName, state, {
        status: "error",
        error: action.payload
      });
    case TYPES.CLEANUP_MONTHLY_STATS:
      return setBuildingState(buildingId, pageName, state, {
        isFetching: false,
        status: "",
        error: "",
        data: []
      });
    case TYPES.MONTHLY_STATS_ADD_BUILDING_STATE:
      {
        let stateCopy = { ...state };
        stateCopy[buildingId] = {};
        stateCopy[buildingId].pages = {};

        getPages().forEach(page => {

          stateCopy[buildingId].pages[page] = {
            isFetching: false,
            status: "",
            error: "",
            data: []
          };

        });

        return stateCopy;
      }
    default: return state;
  }
}

export default monthlyStatsReducer;