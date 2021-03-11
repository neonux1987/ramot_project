import { TYPES } from '../actions/monthsChartAction';
import { initState as is } from '../reducers/util/util';

const initState = is({
  date: {
    year: (new Date()).getFullYear()
  }
});

const monthsChartReducer = (state = initState, action) => {
  switch (action.type) {
    case TYPES.MONTHS_CHART_UPDATE_DATE: {
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

export default monthsChartReducer;