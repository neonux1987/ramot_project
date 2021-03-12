import { TYPES } from '../actions/registeredQuartersActions';
import { initState } from './util/util';

const initialState = initState({
  isFetching: true,
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

const registeredQuarters = (state = initialState, action) => {
  const { buildingNameEng } = action;
  switch (action.type) {
    case TYPES.REGISTERED_QUARTERS_RECEIVE: {
      const { data } = action;
      return setState(buildingNameEng, state, {
        isFetching: false,
        status: "success",
        data
      });
    }
    case TYPES.REGISTERED_QUARTERS_REQUEST: {
      return setState(buildingNameEng, state, {
        isFetching: true
      });
    }
    case TYPES.REGISTERED_QUARTERS_FETCHING_FAILED: {
      const { error } = action;
      return setState(buildingNameEng, state, {
        status: "error",
        error
      });
    }
    case TYPES.REGISTERED_QUARTERS_CLEANUP: {
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

export default registeredQuarters;