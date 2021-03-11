import { TYPES } from '../actions/yearsChartActions';
import { initState as is } from '../reducers/util/util';

const initState = is({
  date: {
    fromYear: "",
    toYear: ""
  }
});

const yearsChartReducer = (state = initState, action) => {
  switch (action.type) {
    case TYPES.YEARS_CHART_UPDATE_DATE: {
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

export default yearsChartReducer;