import { TYPES } from '../actions/monthsChartAction';
import { initState as is } from '../reducers/util/util';

const initState = is({
  date: {
    year: ""
  }
});

const monthsChartReducer = (state = initState, action) => {
  switch (action.type) {
    case TYPES.MONTHS_CHART_UPDATE_DATE: {
      const { buildingId, date } = action;

      return {
        ...state,
        [buildingId]: {
          ...state.buildingId,
          date: {
            ...date
          }
        }
      }
    }
    case TYPES.MONTHS_CHART_ADD_BUILDING_STATE:
      {
        const { buildingId } = action;
        let stateCopy = { ...state };
        stateCopy[buildingId] = {
          date: {
            year: ""
          }
        };

        return stateCopy;
      }
    default: return state;
  }
}

export default monthsChartReducer;