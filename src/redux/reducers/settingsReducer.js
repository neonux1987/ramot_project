
import { TYPES } from '../actions/settingsActions';
import localStore from '../../customHooks/localStore';

const initState = {
  isFetching: true,
  status: "",
  error: "",
  data: {}
};

export default (state = initState, action) => {
  const { setItem, removeItem } = localStore();

  switch (action.type) {
    case TYPES.SETTINGS_RECEIVE:
      const { data } = action;
      setItem("settings", data);
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
        const newState = {
          ...state,
          data: {
            ...state.data,
            [action.settingName]: {
              ...state.data[action.settingName],
              ...action.payload
            }
          }
        };

        setItem("settings", newState.data);
        return newState;
      }
    case TYPES.SETTINGS_CLEANUP:
      removeItem("settings");
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