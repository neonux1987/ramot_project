import { TYPES } from '../actions/routesActions';

const initState = {
  active: {
    label: "",
    parent: null
  }
}

export default (state = initState, action) => {
  switch (action.type) {
    case TYPES.ROUTES_UPDATE: {
      return {
        ...state,
        active: action.active
      }
    }
    default: return state;
  }
}