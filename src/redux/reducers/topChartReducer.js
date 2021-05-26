import { TYPES } from '../actions/topChartActions';
import { initState as is } from '../reducers/util/util';

const initState = is({
  date: {
    fromYear: "",
    toYear: ""
  },
  isFetching: false,
  status: "",
  error: "",
  data: [],
});

const setState = (buildingName, state, newState) => {
  return {
    ...state,
    [buildingName]: {
      ...state[buildingName],
      ...newState
    }
  }
}

const topChartReducer = (state = initState, action) => {
  const { buildingId } = action;

  switch (action.type) {
    case TYPES.TOP_CHART_RECEIVE:
      return setState(buildingId, state, {
        isFetching: false,
        status: "success",
        data: action.data
      });
    case TYPES.TOP_CHART_REQUEST:
      return setState(buildingId, state, {
        isFetching: true
      });
    case TYPES.TOP_CHART_FETCHING_FAILED:
      return setState(buildingId, state, {
        status: "error",
        error: action.error
      });
    case TYPES.TOP_CHART_UPDATE_DATE: {
      const { date } = action;

      return setState(buildingId, state, {
        date: {
          ...date
        }
      });
    }
    case TYPES.TOP_CHART_ADD_BUILDING_STATE:
      {
        let stateCopy = { ...state };
        console.log("topChart", buildingId);
        stateCopy[buildingId] = {
          date: {
            fromYear: "",
            toYear: ""
          },
          isFetching: false,
          status: "",
          error: "",
          data: [],
        };

        return stateCopy;
      }
    case TYPES.TOP_CHART_REMOVE_BUILDING_STATE:
      {
        let stateCopy = { ...state };
        delete stateCopy[buildingId];
        return stateCopy;
      }
    default: return state;
  }
}

export default topChartReducer;