import { TYPES } from "../actions/settingsActions";

let settings = JSON.parse(localStorage.getItem("settings")) || {};

const initState = {
  isFetching: true,
  status: "",
  error: "",
  data: settings ? settings : {}
};

const settingsReducer = (state = initState, action) => {
  switch (action.type) {
    case TYPES.SETTINGS_RECEIVE:
      const { data } = action;
      return {
        ...state,
        isFetching: false,
        status: "success",
        data
      };
    case TYPES.SETTINGS_REQUEST:
      return {
        ...state,
        isFetching: true
      };
    case TYPES.SETTINGS_FETCHING_FAILED:
      return {
        ...state,
        status: "error",
        isFetching: false,
        error: action.payload
      };
    case TYPES.SETTINGS_UPDATE: {
      const { payload } = action;
      const newState = {
        ...state,
        data: {
          ...state.data,
          ...payload
        }
      };
      //update settings in the shared object
      settings = {
        ...settings,
        ...payload
      };

      return newState;
    }
    case TYPES.SETTINGS_UPDATE_SEPCIFIC: {
      const { settingName, payload } = action;
      const newState = {
        ...state,
        data: {
          ...state.data,
          [settingName]: {
            ...state.data[settingName],
            ...payload
          }
        }
      };
      //update settings in the shared object
      settings[settingName] = {
        ...settings[settingName],
        ...payload
      };

      return newState;
    }
    case TYPES.SETTINGS_CLEANUP:
      return {
        isFetching: true,
        saved: true,
        status: "",
        error: "",
        data: {}
      };
    default:
      return state;
  }
};

export default settingsReducer;
