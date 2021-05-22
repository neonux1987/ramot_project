import { TYPES } from '../actions/statisticsActions';
import { initState as is } from '../reducers/util/util';

const initState = is({
  selectedChart: "הוצאות והכנסות לפי חודשים"
});

const statisticsReducer = (state = initState, action) => {
  switch (action.type) {
    case TYPES.STATISTICS_UPDATE_SELECTED_CHART: {
      const { buildingName } = action;

      return {
        ...state,
        [buildingName]: {
          ...state.buildingName,
          selectedChart: action.selectedChart
        }
      }
    }
    case TYPES.STATISTICS_ADD_BUILDING_STATE:
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

export default statisticsReducer;