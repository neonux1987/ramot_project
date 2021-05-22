import { TYPES } from '../actions/buildingsActions';

const initState = {
  isFetching: true,
  status: "",
  error: "",
  data: []
}

const buildingsReducer = (state = initState, action) => {
  switch (action.type) {
    case TYPES.BUILDINGS_ADD: {
      const stateCopy = { ...state };
      stateCopy.data.push(action.payload);
      return stateCopy;
    }
    case TYPES.BUILDINGS_REMOVE: {
      const stateCopy = { ...state };

      stateCopy.data.forEach(({ id }, i) => {
        if (id === action.id)
          delete stateCopy.data[i];
      })

      return stateCopy;
    }
    case TYPES.BUILDINGS_UPDATE:
      const { index, payload } = action;
      const stateCopy = { ...state };
      stateCopy.data[index] = {
        ...stateCopy.data[index],
        ...payload
      };

      return stateCopy;
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