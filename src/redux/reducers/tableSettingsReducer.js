
import { TYPES } from '../actions/tableSettingsActions';

const initState = {
  pages: {
  }
}

const TableSettingsReducer = (state = initState, action) => {
  switch (action.type) {
    case TYPES.TABLE_SETTINGS_RECEIVE:
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
    case TYPES.TABLE_SETTINGS_REQUEST:
      return {
        ...state,
        pages: {
          ...state.pages,
          [action.pageName]: {
            ...state.pages[action.pageName],
            isFetching: true
          }
        }
      }
    case TYPES.TABLE_SETTINGS_FETCHING_FAILED:
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
    case TYPES.TABLE_SETTINGS_UPDATE:
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
    case TYPES.TABLE_SETTINGS_CLEANUP: {
      const pagesCopy = { ...state.pages };
      delete pagesCopy[action.pageName];
      return {
        ...state,
        pages: pagesCopy
      }
    }
    case TYPES.TABLE_SETTINGS_SET_START_ELEMENT: {
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
    case TYPES.TABLE_SETTINGS_INIT:
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

export default TableSettingsReducer;