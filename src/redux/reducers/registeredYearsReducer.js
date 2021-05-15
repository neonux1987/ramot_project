import { TYPES } from '../actions/registeredYearsActions';
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

const registeredYears = (state = initialState, action) => {
  const buildingId = action.buildingId;

  switch (action.type) {
    case TYPES.REGISTERED_YEARS_RECEIVE: {
      const { data } = action;
      return setState(buildingId, state, {
        isFetching: false,
        status: "success",
        data
      });
    }
    case TYPES.REGISTERED_YEARS_REQUEST: {
      return setState(buildingId, state, {
        isFetching: true
      });
    }
    case TYPES.REGISTERED_YEARS_FETCHING_FAILED: {
      const { error } = action;
      return setState(buildingId, state, {
        status: "error",
        error
      });
    }
    case TYPES.REGISTERED_YEARS_CLEANUP: {
      return setState(buildingId, state, {
        isFetching: false,
        status: "",
        error: "",
        data: []
      });
    }
    default: return state;
  }
}

export default registeredYears;