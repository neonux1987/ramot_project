import { TYPES } from '../actions/registeredBackupsActions';

const initState = {
  isFetching: false,
  status: "",
  error: "",
  data: []
}

const registeredBackupsReducer = (state = initState, action) => {
  switch (action.type) {
    case TYPES.REGISTERED_BACKUPS_RECEIVE:
      return {
        ...state,
        isFetching: false,
        status: "success",
        data: action.data
      }
    case TYPES.REGISTERED_BACKUPS_REQUEST:
      return {
        ...state,
        isFetching: true,
      }
    case TYPES.REGISTERED_BACKUPS_FETCHING_FAILED:
      return {
        ...state,
        status: "error",
        error: action.payload
      }
    case TYPES.REGISTERED_BACKUPS_INIT:
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

export default registeredBackupsReducer;