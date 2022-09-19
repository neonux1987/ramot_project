import { TYPES } from "../actions/routesActions";

const initState = {
  active: {
    pathname: "/דף-הבית",
    state: {
      page: "דף הבית",
      buildingName: "דף הבית",
      buildingId: "home"
    },
    expanded: {}
  }
};

const routesReducer = (state = initState, action) => {
  switch (action.type) {
    case TYPES.ROUTES_UPDATE:
      return {
        ...state,
        active: {
          ...state.active,
          ...action.active,
          expanded: {
            ...state.active.expanded,
            ...action.active.expanded
          }
        }
      };
    default:
      return state;
  }
};

export default routesReducer;
