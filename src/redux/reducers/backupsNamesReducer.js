import { TYPES } from '../actions/backupsNamesActions';
const initState = {
  isFetching: false,
  status: "",
  error: "",
  data: []
}

export default (state = initState, action) => {
  switch (action.type) {
    case TYPES.BACKUPS_NAMES_RECEIVE:
      return {
        ...state,
        isFetching: false,
        status: "success",
        data: action.data
      }
    case TYPES.BACKUPS_NAMES_REQUEST:
      return {
        ...state,
        isFetching: true,
      }
    case TYPES.BACKUPS_NAMES_FETCHING_FAILED:
      return {
        ...state,
        status: "error",
        error: action.payload
      }
    case TYPES.BACKUPS_NAMES_INIT:
      return {
        ...state,
        isFetching: false,
        status: "",
        error: "",
        data: []
      }
    default: return state;
  }
}