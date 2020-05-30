import { TYPES } from '../actions/registeredQuartersActions';
import { setState } from './util/util';

const initState = {
  pages: {}
}

export default (state = initState, action) => {
  switch (action.type) {
    case TYPES.REGISTERED_QUARTERS_RECEIVE: {
      const { pageName, buildingName, data } = action;
      return setState(state, pageName, buildingName, {
        isFetching: false,
        status: "success",
        data: data
      });
    }
    case TYPES.REGISTERED_QUARTERS_REQUEST: {
      const { pageName, buildingName } = action;
      return setState(state, pageName, buildingName, {
        isFetching: true
      });
    }
    case TYPES.REGISTERED_QUARTERS_FETCHING_FAILED: {
      const { pageName, buildingName, error } = action;
      return setState(state, pageName, buildingName, {
        status: "error",
        error
      });
    }
    case TYPES.REGISTERED_QUARTERS_CLEANUP: {
      const { pageName, buildingName } = action;
      return setState(state, pageName, buildingName, {
        isFetching: false,
        status: "",
        error: "",
        data: []
      });
    }
    case TYPES.REGISTERED_QUARTERS_INIT_PAGE: {
      const {
        pageName
      } = action;

      return {
        ...state,
        pages: {
          ...state.pages,
          [pageName]: {
            ...state.pages[pageName]
          }
        }
      };
    }
    case TYPES.REGISTERED_QUARTERS_INIT_BUILDING: {
      const {
        buildingName,
        pageName
      } = action;

      return {
        ...state,
        pages: {
          ...state.pages,
          [pageName]: {
            ...state.pages[pageName],
            [buildingName]: {
              isFetching: false,
              status: "",
              error: "",
              data: []
            }
          }
        }
      };
    }
    default: return state;
  }
}
