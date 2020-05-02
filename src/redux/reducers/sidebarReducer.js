import { TYPES } from '../actions/sidebarActions';

const initState = {
  showSidebar: true,
  menu: {
    isFetching: true,
    status: "",
    error: "",
    data: []
  }
}

export default (state = initState, action) => {
  switch (action.type) {
    case TYPES.SIDEBAR_TOGGLE:
      return {
        ...state,
        showSidebar: !state.showSidebar
      }
    case TYPES.SIDEBAR_RECEIVE:
      return {
        ...state,
        menu: {
          ...state.menu,
          isFetching: false,
          status: "success",
          data: action.data
        }
      }
    case TYPES.SIDEBAR_REQUEST:
      return {
        ...state,
        menu: {
          ...state.menu,
          isFetching: true,
        }
      }
    case TYPES.SIDEBAR_FETCHING_FAILED:
      return {
        ...state,
        menu: {
          ...state.menu,
          status: "error",
          error: action.payload
        }
      }
    default: return state;
  }
}