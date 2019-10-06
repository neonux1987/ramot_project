
const initState = {
  pageName: "settings",
  headerTitle: "כללי",
  settings: {
    isFetching: true,
    saved: true,
    status: "",
    error: "",
    data: {}
  }
}

export default (state = initState, action) => {
  switch (action.type) {
    case "RECEIVE_SETTINGS":
      return {
        ...state,
        settings: {
          ...state.settings,
          isFetching: false,
          status: "success",
          data: action.data
        }
      }
    case "REQUEST_SETTINGS":
      return {
        ...state,
        settings: {
          ...state.settings,
          isFetching: true,
        }
      }
    case "FETCHING_FAILED":
      return {
        ...state,
        settings: {
          ...state.settings,
          status: "error",
          error: action.payload
        }
      }
    case "UPDATE_SETTINGS":
      {
        const data = { ...state.settings.data };
        data[action.name] = action.data;
        return {
          ...state,
          settings: {
            ...state.settings,
            data: data
          }
        }
      }
    default: return state;
  }
}