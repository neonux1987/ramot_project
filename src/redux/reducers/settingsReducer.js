
import { TYPES } from '../actions/settingsActions';

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
    case TYPES.SETTINGS_RECEIVE:
      return {
        ...state,
        settings: {
          ...state.settings,
          isFetching: false,
          status: "success",
          data: action.data
        }
      }
    case TYPES.SETTINGS_REQUEST:
      return {
        ...state,
        settings: {
          ...state.settings,
          isFetching: true,
        }
      }
    case TYPES.SETTINGS_FETCHING_FAILED:
      return {
        ...state,
        settings: {
          ...state.settings,
          status: "error",
          error: action.payload
        }
      }
    case TYPES.SETTINGS_UPDATE:
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
    case TYPES.SETTINGS_DB_BACKUP_UPDATE:
      {
        const data = { ...state.settings.data };
        data.db_backup[action.key] = action.data;
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