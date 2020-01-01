
const initState = {
  pageName: "settings",
  headerTitle: "כללי",
  backupsNames: {
    isFetching: false,
    status: "",
    error: "",
    data: []
  }
}

export default (state = initState, action) => {
  switch (action.type) {
    case "RECEIVE_BACKUPS_NAMES":
      return {
        ...state,
        backupsNames: {
          ...state.backupsNames,
          isFetching: false,
          status: "success",
          data: action.data
        }
      }
    case "REQUEST_BACKUPS_NAMES":
      return {
        ...state,
        backupsNames: {
          ...state.backupsNames,
          isFetching: true,
        }
      }
    case "BACKUPS_NAMES_FETCHING_FAILED":
      return {
        ...state,
        backupsNames: {
          ...state.backupsNames,
          status: "error",
          error: action.payload
        }
      }
    case "BACKUPS_NAMES_INIT":
      return {
        ...state,
        backupsNames: {
          isFetching: false,
          status: "",
          error: "",
          data: []
        }
      }
    default: return state;
  }
}