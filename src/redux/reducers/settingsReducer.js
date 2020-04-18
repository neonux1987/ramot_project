
import { TYPES } from '../actions/settingsActions';

const pages = ["db_backup", "empty_reports_generator", "general", "services"];

const initState = {};

pages.forEach((pageName) => {
  initState[pageName] = {
    isFetching: true,
    status: "",
    error: "",
    data: {}
  }
});

export default (state = initState, action) => {
  switch (action.type) {
    case TYPES.SETTINGS_RECEIVE:
      return {
        ...state,
        [action.settingName]: {
          ...state[action.settingName],
          isFetching: false,
          status: "success",
          data: action.data
        }
      }
    case TYPES.SETTINGS_REQUEST:
      return {
        ...state,
        [action.settingName]: {
          ...state[action.settingName],
          isFetching: true
        }
      }
    case TYPES.SETTINGS_FETCHING_FAILED:
      return {
        ...state,
        [action.settingName]: {
          ...state[action.settingName],
          status: "error",
          error: action.payload
        }
      }
    case TYPES.SETTINGS_UPDATE:
      {
        return {
          ...state,
          [action.settingName]: {
            ...state[action.settingName],
            data: {
              ...state[action.settingName].data,
              ...action.data
            }
          }
        }
      }
    case TYPES.SETTINGS_CLEANUP:
      {
        const { serviceName } = action;

        const dataCopy = { ...state.data };
        delete dataCopy[serviceName];

        return {
          ...state,
          [action.settingName]: {
            isFetching: true,
            saved: true,
            status: "",
            error: "",
            data: {}
          }
        }
      }
    default: return state;
  }
}