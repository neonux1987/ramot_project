const initState = {
  toggleSidebar: true,
  sidebar: {
    isFetching: true,
    status: "",
    error: "",
    data: []
  }
}

export default (state = initState, action) => {
  switch (action.type) {
    case "TOGGLE_SIDEBAR":
      return {
        ...state,
        toggleSidebar: action.payload
      }
    case "RECEIVE_SIDEBAR":
      return {
        ...state,
        sidebar: {
          ...state.sidebar,
          isFetching: false,
          status: "success",
          data: action.data
        }
      }
    case "REQUEST_SIDEBAR":
      return {
        ...state,
        sidebar: {
          ...state.sidebar,
          isFetching: true,
        }
      }
    case "FETCHING_FAILED":
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