
import { TYPES } from '../actions/settingsActions';

const initState = {
  isFetching: true,
  status: "",
  error: "",
  data: {}
};

export default (state = initState, action) => {
  switch (action.type) {
    case TYPES.SETTINGS_RECEIVE:
      return {
        ...state,
        isFetching: false,
        status: "success",
        data: action.data
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
        return {
          ...state,
          data: {
            ...state.data,
            [action.settingName]: {
              ...state.data[action.settingName],
              ...action.payload
            }
          }
        }
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