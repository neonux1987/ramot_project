import { TYPES } from '../actions/routesActions';

const initState = {
  active: {
    pathname: "/דף-הבית",
    state: {
      page: "דף הבית",
      buildingName: "",
      buildingNameEng: ""
    },
    expanded: {}
  }
}

export default (state = initState, action) => {
  switch (action.type) {
    case TYPES.ROUTES_UPDATE:
      {
        const newState = {
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
        return newState;
      }
    default: return state;
  }
}