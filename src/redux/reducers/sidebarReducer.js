import { TYPES } from '../actions/sidebarActions';

const initState = {
  showSidebar: true,
  sidebar: {
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
        sidebar: {
          ...state.sidebar,
          isFetching: false,
          status: "success",
          data: action.data
        }
      }
    case TYPES.SIDEBAR_REQUEST:
      return {
        ...state,
        sidebar: {
          ...state.sidebar,
          isFetching: true,
        }
      }
    case TYPES.SIDEBAR_FETCHING_FAILED:
      return {
        ...state,
        sidebar: {
          ...state.sidebar,
          status: "error",
          error: action.payload
        }
      }
    default: return state;
  }
}