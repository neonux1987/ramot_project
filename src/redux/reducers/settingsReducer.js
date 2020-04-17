
import { TYPES } from '../actions/settingsActions';

const initState = {
  isFetching: true,
  saved: true,
  status: "",
  error: "",
  data: {}
}

export default (state = initState, action) => {
  switch (action.type) {
    case TYPES.SETTINGS_RECEIVE:
      return {
        ...state,
        isFetching: false,
        status: "success",
        data: action.data
      }
    case TYPES.SETTINGS_RECEIVE_SPECIFIC_SETTING:
      return {
        ...state,
        isFetching: false,
        status: "success",
        data: {
          ...state.data,
          [action.settingName]: action.data
        }
      }
    case TYPES.SETTINGS_REQUEST:
      return {
        ...state,
        isFetching: true,
      }
    case TYPES.SETTINGS_FETCHING_FAILED:
      return {
        ...state,
        status: "error",
        error: action.payload
      }
    case TYPES.SETTINGS_UPDATE:
      {
        const data = { ...state.data };
        data[action.name] = action.data;
        return {
          ...state,
          data
        }
      }
    case TYPES.SETTINGS_DB_BACKUP_UPDATE:
      {
        const data = { ...state.data };
        data.db_backup[action.key] = action.data;
        return {
          ...state,
          data
        }
      }
    case TYPES.SETTINGS_CLEANUP:
      {
        const { serviceName } = action;

        const dataCopy = { ...state.data };
        delete dataCopy[serviceName];

        return {
          isFetching: true,
          saved: true,
          status: "",
          error: "",
          data: dataCopy
        }
      }
    default: return state;
  }
}