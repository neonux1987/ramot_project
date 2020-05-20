import { TYPES } from '../actions/registeredYearsActions';

const initState = {
  buildings: {}
}

export default (state = initState, action) => {
  switch (action.type) {
    case TYPES.REGISTERED_YEARS_RECEIVE: {
      const { buildingName, pageName, data } = action;

      return setState(state, buildingName, pageName, {
        isFetching: false,
        status: "success",
        data
      });
    }

    case TYPES.REGISTERED_YEARS_REQUEST: {
      const { buildingName, pageName } = action;

      return setState(state, buildingName, pageName, {
        isFetching: true,
        status: "success"
      });
    }
    case TYPES.REGISTERED_YEARS_FETCHING_FAILED: {
      const { buildingName, pageName, error } = action;

      return setState(state, buildingName, pageName, {
        status: "error",
        error
      });
    }
    case TYPES.REGISTERED_YEARS_CLEANUP:
      {
        const { buildingName, pageName } = action;

        return setState(state, buildingName, pageName, {
          isFetching: false,
          status: "",
          error: "",
          data: []
        });
      }
    case TYPES.REGISTERED_YEARS_INIT_BUILDING:
      {
        const { buildingName } = action;

        return {
          ...state,
          buildings: {
            ...state.buildings,
            [buildingName]: {
              pages: {

              }
            }
          }
        }
      }

    case TYPES.REGISTERED_YEARS_INIT_PAGE:
      {
        const { buildingName, pageName } = action;

        return {
          ...state,
          buildings: {
            ...state.buildings,
            [buildingName]: {
              pages: {
                ...state.buildings[buildingName].pages,
                [pageName]: {

                }
              }
            }
          }
        }
      }
    default: return state;
  }
}

const setState = (state, buildingName, pageName, target) => {
  return {
    ...state,
    [buildingName]: {
      ...state.buildings[buildingName],
      pages: {
        ...state.buildings[buildingName].pages,
        [pageName]: {
          ...state.buildings[buildingName].pages[pageName],
          ...target
        }
      }
    }
  }
}