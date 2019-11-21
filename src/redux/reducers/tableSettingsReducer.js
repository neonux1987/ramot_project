
import {
  REQUEST_TABLE_SETTINGS,
  RECEIVE_TABLE_SETTINGS,
  TABLE_SETTINGS_FETCHING_FAILED,
  UPDATE_TABLE_SETTINGS,
  TABLE_SETTINGS_CLEANUP,
  SET_START_ELEMENT,
  INIT_TABLE_SETTINGS
} from '../actions/tableSettingsActions';

const initState = {
  pages: {
  }
}

export default (state = initState, action) => {
  switch (action.type) {
    case RECEIVE_TABLE_SETTINGS:
      return {
        ...state,
        pages: {
          ...state.pages,
          [action.pageName]: {
            ...state.pages[action.pageName],
            isFetching: false,
            status: "success",
            data: action.settings
          }
        }
      }
    case REQUEST_TABLE_SETTINGS:
      return {
        ...state,
        pages: {
          ...state.pages,
          [action.pageName]: {
            ...state.pages[action.pageName],
            isFetching: true,
            status: "",
            error: "",
            data: []
          }
        }
      }
    case TABLE_SETTINGS_FETCHING_FAILED:
      return {
        ...state,
        pages: {
          ...state.pages,
          [action.pageName]: {
            ...state.pages[action.pageName],
            status: "error",
            error: action.error
          }
        }
      }
    case UPDATE_TABLE_SETTINGS:
      return {
        ...state,
        pages: {
          ...state.pages,
          [action.pageName]: {
            ...state.pages[action.pageName],
            data: action.settings
          }
        }
      }
    case TABLE_SETTINGS_CLEANUP: {
      const pagesCopy = { ...state.pages };
      delete pagesCopy[action.pageName];
      return {
        ...state,
        pages: pagesCopy
      }
    }
    case SET_START_ELEMENT: {
      const pagesCopy = { ...state.pages };
      delete pagesCopy[action.pageName];
      return {
        ...state,
        pages: {
          ...state.pages,
          [action.pageName]: {
            ...state.pages[action.pageName],
            startElement: action.value
          }
        }
      }
    }
    case INIT_TABLE_SETTINGS:
      return {
        pages: {
          [action.pageName]: {
            isFetching: false,
            status: "",
            error: "",
            data: []
          }
        }
      }
    default: return state;
  }
}