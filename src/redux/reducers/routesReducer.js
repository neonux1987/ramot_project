import { TYPES } from '../actions/routesActions';

const initState = {
  active: {
    pathname: "/דף-הבית",
    state: {
      page: "דף הבית",
      buildingName: "",
      buildingNameEng: ""
    }
  }
}

export default (state = initState, action) => {
  switch (action.type) {
    case TYPES.ROUTES_UPDATE:
      return {
        ...state,
        active: { ...action.active }
      }
    default: return state;
  }
}