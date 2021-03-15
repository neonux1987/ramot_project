import { TYPES } from '../actions/topChartActions';
import { initState as is } from '../reducers/util/util';

const initState = is({
  date: {
    fromYear: "",
    toYear: ""
  }
});

const topChartReducer = (state = initState, action) => {
  switch (action.type) {
    case TYPES.TOP_CHART_UPDATE_DATE: {
      const { buildingName, date } = action;

      return {
        ...state,
        [buildingName]: {
          ...state.buildingName,
          date: {
            ...date
          }
        }
      }
    }
    default: return state;
  }
}

export default topChartReducer;