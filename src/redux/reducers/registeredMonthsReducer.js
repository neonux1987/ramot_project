import { TYPES } from '../actions/registeredMonthsActions';
import { initState } from './util/util';

const initialState = initState({
  isFetching: false,
  status: "",
  error: "",
  data: []
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


const registeredMonths = (state = initialState, action) => {
  const { buildingNameEng } = action;
  switch (action.type) {
    case TYPES.REGISTERED_MONTHS_RECEIVE: {
      const { data } = action;
      return setState(buildingNameEng, state, {
        isFetching: false,
        status: "success",
        data
      });
    }
    case TYPES.REGISTERED_MONTHS_REQUEST: {
      return setState(buildingNameEng, state, {
        isFetching: true
      });
    }
    case TYPES.REGISTERED_MONTHS_FETCHING_FAILED: {
      const { error } = action;
      return setState(buildingNameEng, state, {
        status: "error",
        error
      });
    }
    case TYPES.REGISTERED_MONTHS_CLEANUP: {
      return setState(buildingNameEng, state, {
        isFetching: false,
        status: "",
        error: "",
        data: []
      });
    }
    default: return state;
  }
}

export default registeredMonths;