import { TYPES } from '../actions/quartersChartActions';
import { initState as is } from '../reducers/util/util';

const initState = is({
  date: {
    year: ""
  }
});

const quartersChartReducer = (state = initState, action) => {
  switch (action.type) {
    case TYPES.QUARTERS_CHART_UPDATE_DATE: {
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
    case TYPES.QUARTERS_CHART_ADD_BUILDING_STATE:
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
    case TYPES.QUARTERS_CHART_REMOVE_BUILDING_STATE:
      {
        const { buildingId } = action;
        let stateCopy = { ...state };
        delete stateCopy[buildingId];
        return stateCopy;
      }
    default: return state;
  }
}

export default quartersChartReducer;