import { TYPES } from '../actions/summarizedSectionsActions';

const initState = {
  isFetching: false,
  status: "",
  error: "",
  data: []
}

export default (state = initState, action) => {
  switch (action.type) {
    case TYPES.SUMMARIZED_SECTIONS_RECEIVE:
      return {
        ...state,
        isFetching: false,
        status: "success",
        data: action.data
      }
    case TYPES.SUMMARIZED_SECTIONS_REQUEST:
      return {
        ...state,
        isFetching: true,
      }
    case TYPES.SUMMARIZED_SECTIONS_UPDATE: {
      const {
        payload,
        index
      } = action;

      const dataCopy = [...state.data];

      dataCopy[index] = payload;

      return {
        ...state,
        data: dataCopy
      }
    }
    case TYPES.SUMMARIZED_SECTIONS_ADD: {
      const {
        payload
      } = action;

      const dataCopy = [...state.data];

      dataCopy.push(payload);

      return {
        ...state,
        data: dataCopy
      }
    }
    case TYPES.SUMMARIZED_SECTIONS_DELETE: {
      const dataCopy = [...state.data];

      dataCopy.splice(action.index, 1);

      return {
        ...state,
        data: dataCopy
      }
    }
    case TYPES.SUMMARIZED_SECTIONS_FETCHING_FAILED:
      return {
        ...state,
        status: "error",
        error: action.payload
      }
    case TYPES.SUMMARIZED_SECTIONS_CLEANUP:
      return {
        ...state,
        isFetching: false,
        status: "",
        error: "",
        data: []
      }
    default: return state;
  }
}