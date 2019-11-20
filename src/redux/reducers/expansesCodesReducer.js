import Helper from '../../helpers/Helper';

const initState = {
  expansesCodes: {
    isFetching: false,
    status: "",
    error: "",
    data: []
  }
}

export default (state = initState, action) => {
  switch (action.type) {
    case "ADD_EXPANSE_CODE": {
      const copyData = [...state.expansesCodes.data];
      copyData.push(action.payload);
      return {
        ...state,
        expansesCodes: {
          ...state.expansesCodes,
          data: copyData
        }
      }
    }
    case "RECEIVE_EXPANSES_CODES":
      return {
        ...state,
        expansesCodes: {
          ...state.expansesCodes,
          isFetching: false,
          status: "success",
          data: action.data
        }
      }
    case "REQUEST_EXPANSES_CODES":
      return {
        ...state,
        expansesCodes: {
          ...state.expansesCodes,
          isFetching: true,
        }
      }
    case "FETCHING_FAILED":
      return {
        ...state,
        expansesCodes: {
          ...state.expansesCodes,
          status: "error",
          error: action.payload
        }
      }
    case "EXPANSES_CODES_CLEANUP":
      return {
        ...state,
        expansesCodes: {
          isFetching: false,
          status: "",
          error: "",
          data: []
        }
      }
    case "UPDATE_DATE":
      return {
        ...state,
        date: {
          ...state.date,
          ...action.payload
        }
      }
    case "SET_CURRENT_DATE": return {
      ...state,
      date: Helper.getCurrentDate()
    }
    default: return state;
  }
}