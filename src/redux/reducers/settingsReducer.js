
import { TYPES } from '../actions/settingsActions';

const settings = require('electron').remote.getGlobal("sharedObject").settings;

const initState = {
  isFetching: true,
  status: "",
  error: "",
  data: settings ? settings : {}
};

export default (state = initState, action) => {
  switch (action.type) {
    case TYPES.SETTINGS_RECEIVE:
      const { data } = action;
      return {
        ...state,
        isFetching: false,
        status: "success",
        data
      }
    case TYPES.SETTINGS_REQUEST:
      return {
        ...state,
        isFetching: true
      }
    case TYPES.SETTINGS_FETCHING_FAILED:
      return {
        ...state,
        status: "error",
        error: action.payload
      }
    case TYPES.SETTINGS_UPDATE:
      {
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
        settings[settingName] = payload;

        return newState;
      }
    case TYPES.SETTINGS_CLEANUP:
      return {
        isFetching: true,
        saved: true,
        status: "",
        error: "",
        data: {}
      }
    default: return state;
  }
}