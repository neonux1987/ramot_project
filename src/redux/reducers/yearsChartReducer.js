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
    case TYPES.YEARS_CHART_ADD_BUILDING_STATE:
      {
        const { buildingId } = action;
        let stateCopy = { ...state };
        stateCopy[buildingId] = {
          date: {
            fromYear: "",
            toYear: ""
          }
        };

        return stateCopy;
      }
    default: return state;
  }
}

export default yearsChartReducer;