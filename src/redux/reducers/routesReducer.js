import { TYPES } from '../actions/routesActions';

const initState = {
  active: {
    pageName: "",
    parent: null
  }
}

export default (state = initState, action) => {
  switch (action.type) {
    case TYPES.ROUTES_UPDATE: {
      if (state.active.pageName === action.active.parent.pageName) {
        return {
          ...state,
          active: {
            pageName: action.pageName,
            parent: { ...state.parent }
          }
        }
      } else
        return {
          ...state,
          active: { ...action.active }
        }
    }
    default: return state;
  }
}