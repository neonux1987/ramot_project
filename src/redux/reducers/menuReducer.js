import { TYPES } from '../actions/menuActions';

const initState = {
  isFetching: true,
  status: "",
  error: "",
  data: []
}

const MenuReducer = (state = initState, action) => {
  switch (action.type) {
    case TYPES.MENU_RECEIVE:
      return {
        ...state,
        isFetching: false,
        status: "success",
        data: action.data
      }
    case TYPES.MENU_REQUEST:
      return {
        ...state,
        isFetching: true,
      }
    case TYPES.MENU_FETCHING_FAILED:
      return {
        ...state,
        status: "error",
        error: action.payload
      }
    default: return state;
  }
}

export default MenuReducer;