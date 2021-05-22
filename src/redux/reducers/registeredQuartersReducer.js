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
  const { buildingId } = action;
  switch (action.type) {
    case TYPES.REGISTERED_QUARTERS_RECEIVE: {
      const { data } = action;
      return setState(buildingId, state, {
        isFetching: false,
        status: "success",
        data
      });
    }
    case TYPES.REGISTERED_QUARTERS_REQUEST: {
      return setState(buildingId, state, {
        isFetching: true
      });
    }
    case TYPES.REGISTERED_QUARTERS_FETCHING_FAILED: {
      const { error } = action;
      return setState(buildingId, state, {
        status: "error",
        error
      });
    }
    case TYPES.REGISTERED_QUARTERS_CLEANUP: {
      return setState(buildingId, state, {
        isFetching: false,
        status: "",
        error: "",
        data: []
      });
    }
    case TYPES.REGISTERED_QUARTERS_ADD_BUILDING_STATE:
      {
        let stateCopy = { ...state };
        stateCopy[buildingId] = {
          isFetching: true,
          status: "",
          error: "",
          data: []
        };

        return stateCopy;
      }
    case TYPES.REGISTERED_QUARTERS_REMOVE_BUILDING_STATE:
      {
        let stateCopy = { ...state };
        delete stateCopy[buildingId];
        return stateCopy;
      }
    default: return state;
  }
}

export default registeredQuarters;