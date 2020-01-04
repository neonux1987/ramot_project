import { TYPES } from '../actions/expansesCodesActions'

const initState = {
  isFetching: false,
  status: "",
  error: "",
  data: []
}

export default (state = initState, action) => {
  switch (action.type) {
    case TYPES.EXPANSES_CODES_ADD: {
      const copyData = [...state.data];
      copyData.push(action.payload);
      return setState(state, {
        data: copyData
      });
    }
    case TYPES.EXPANSES_CODES_RECEIVE:
      return setState(state, {
        isFetching: false,
        status: "success",
        data: action.data
      });
    case TYPES.EXPANSES_CODES_REQUEST:
      return setState(state, {
        isFetching: true,
      });
    case TYPES.EXPANSES_CODES_FETCHING_FAILED:
      return setState(state, {
        status: "error",
        error: action.payload
      });
    case TYPES.EXPANSES_CODES_DELETE: {
      const copyData = [...state.data];
      copyData.splice(action.index, 1);

      return setState(state, {
        data: copyData
      });
    }
    case TYPES.EXPANSES_CODES_CLEANUP:
      return setState(state, {
        isFetching: false,
        status: "",
        error: "",
        data: []
      });
    case TYPES.EXPANSES_CODES_UPDATE:
      {
        const {
          payload,
          index
        } = action;

        // copy the data
        const dataCopy = [...state.data];

        // replace the old object with the updated object
        dataCopy[index] = payload;

        return setState(state, {
          data: dataCopy
        });
      }

    default: return state;
  }
}

function setState(state, target) {
  return {
    ...state,
    ...target
  }
}