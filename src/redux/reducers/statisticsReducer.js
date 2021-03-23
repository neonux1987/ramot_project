import { TYPES } from '../actions/statisticsActions';
import { initState as is } from '../reducers/util/util';

const initState = is({
  selectedChart: "הוצאות והכנסות לפי חודשים"
});

const statisticsReducer = (state = initState, action) => {
  const { buildingName } = action;
  switch (action.type) {
    case TYPES.STATISTICS_UPDATE_SELECTED_CHART: return {
      ...state,
      [buildingName]: {
        ...state.buildingName,
        selectedChart: action.selectedChart
      }
    }
    default: return state;
  }
}

export default statisticsReducer;