import { TYPES } from '../actions/buildingsActions';

const initState = {
  isFetching: true,
  status: "",
  error: "",
  data: []
}

const buildingsReducer = (state = initState, action) => {
  switch (action.type) {
    case TYPES.BUILDINGS_RECEIVE:
      return {
        ...state,
        isFetching: false,
        status: "success",
        data: action.data
      }
    case TYPES.BUILDINGS_REQUEST:
      return {
        ...state,
        isFetching: true,
      }
    case TYPES.BUILDINGS_FETCHING_FAILED:
      return {
        ...state,
        status: "error",
        error: action.error
      }
    default: return state;
  }
}

export default buildingsReducer;