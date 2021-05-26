import { TYPES } from '../actions/yearlyStatsActions';
import { initBuildingState, setBuildingState, getPages } from '../reducers/util/util';

const initState = initBuildingState({
  isFetching: false,
  status: "",
  error: "",
  data: []
});

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
    case TYPES.YEARLY_STATS_ADD_BUILDING_STATE:
      {
        let stateCopy = { ...state };
        stateCopy[buildingId] = {};
        stateCopy[buildingId].pages = {};
        console.log("yearlyStats", buildingId);
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
    case TYPES.YEARLY_STATS_REMOVE_BUILDING_STATE:
      {
        let stateCopy = { ...state };
        delete stateCopy[buildingId];
        return stateCopy;
      }
    default: return state;
  }
}

export default YearlyStatsReducer;