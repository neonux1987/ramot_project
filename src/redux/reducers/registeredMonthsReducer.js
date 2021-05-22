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


const registeredMonthsReducer = (state = initialState, action) => {
  const { buildingId } = action;
  switch (action.type) {
    case TYPES.REGISTERED_MONTHS_RECEIVE: {
      const { data } = action;
      return setState(buildingId, state, {
        isFetching: false,
        status: "success",
        data
      });
    }
    case TYPES.REGISTERED_MONTHS_REQUEST: {
      return setState(buildingId, state, {
        isFetching: true
      });
    }
    case TYPES.REGISTERED_MONTHS_FETCHING_FAILED: {
      const { error } = action;
      return setState(buildingId, state, {
        status: "error",
        error
      });
    }
    case TYPES.REGISTERED_MONTHS_CLEANUP: {
      return setState(buildingId, state, {
        isFetching: false,
        status: "",
        error: "",
        data: []
      });
    }
    case TYPES.REGISTERED_MONTHS_ADD_BUILDING_STATE:
      {
        let stateCopy = { ...state };
        stateCopy[buildingId] = {
          isFetching: false,
          status: "",
          error: "",
          data: []
        };

        return stateCopy;
      }
    case TYPES.REGISTERED_MONTHS_REMOVE_BUILDING_STATE:
      {
        let stateCopy = { ...state };
        delete stateCopy[buildingId];
        return stateCopy;
      }
    default: return state;
  }
}

export default registeredMonthsReducer;