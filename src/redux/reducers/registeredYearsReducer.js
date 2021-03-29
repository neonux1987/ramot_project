import { TYPES } from '../actions/registeredYearsActions';
import { initStateV2 } from './util/util';

function setState(buildingName, state, newState) {
  return {
    ...state,
    [buildingName]: {
      ...state[buildingName],
      ...newState
    }
  }
}

export default function createRegisteredYearsReducer(buildings) {

  const initialState = initStateV2(buildings, {
    isFetching: true,
    status: "",
    error: "",
    data: []
  });

  return (state = initialState, action) => {
    const buildingNameEng = action.buildingNameEng;

    switch (action.type) {
      case TYPES.REGISTERED_YEARS_RECEIVE: {
        const { data } = action;
        return setState(buildingNameEng, state, {
          isFetching: false,
          status: "success",
          data
        });
      }
      case TYPES.REGISTERED_YEARS_REQUEST: {
        return setState(buildingNameEng, state, {
          isFetching: true
        });
      }
      case TYPES.REGISTERED_YEARS_FETCHING_FAILED: {
        const { error } = action;
        return setState(buildingNameEng, state, {
          status: "error",
          error
        });
      }
      case TYPES.REGISTERED_YEARS_CLEANUP: {
        return setState(buildingNameEng, state, {
          isFetching: false,
          status: "",
          error: "",
          data: []
        });
      }
      default: return state;
    }
  };
}