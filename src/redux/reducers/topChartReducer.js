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
  const { buildingNameEng } = action;

  switch (action.type) {
    case TYPES.TOP_CHART_RECEIVE:
      return setState(buildingNameEng, state, {
        isFetching: false,
        status: "success",
        data: action.data
      });
    case TYPES.TOP_CHART_REQUEST:
      return setState(buildingNameEng, state, {
        isFetching: true
      });
    case TYPES.TOP_CHART_FETCHING_FAILED:
      return setState(buildingNameEng, state, {
        status: "error",
        error: action.error
      });
    case TYPES.TOP_CHART_UPDATE_DATE: {
      const { date } = action;

      return setState(buildingNameEng, state, {
        date: {
          ...date
        }
      });
    }
    default: return state;
  }
}

export default topChartReducer;