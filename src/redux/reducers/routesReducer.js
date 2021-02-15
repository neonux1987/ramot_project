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
        return {
          ...state,
          active: {
            ...state.active,
            expanded: {
              ...state.active.expanded,
              ...action.active.expanded
            }
          }
        }
      }
    default: return state;
  }
}