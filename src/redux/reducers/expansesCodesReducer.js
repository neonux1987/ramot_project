import Helper from '../../helpers/Helper';

const initState = {
  pageName: "expansesCodes",
  headerTitle: "קישור סעיפים",
  date: Helper.getCurrentDate(),
  expansesCodes: {
    isFetching: false,
    status: "",
    error: "",
    data: []
  }
}

export default (state = initState, action) => {
  switch (action.type) {
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
    case "ADD_EXPANSES_CODE":
      return {
        ...state,
        tableData: action.payload
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