import Helper from '../../helpers/Helper';

const initState = {
  pageName: "monthExpanses",
  headerTitle: "מעקב הוצאות חודשיות",
  date: Helper.getCurrentDate(),
  expanses: {
    isFetching: false,
    status: "",
    error: "",
    data: []
  }
}

export default (state = initState, action) => {
  switch (action.type) {
    case "RECEIVE_MONTH_EXPANSES":
      return {
        ...state,
        expanses: {
          ...state.expanses,
          isFetching: false,
          status: "success",
          data: action.data
        }
      }
    case "REQUEST_MONTH_EXPANSES":
      return {
        ...state,
        expanses: {
          ...state.expanses,
          isFetching: true,
        }
      }
    case "UPDATE_MONTH_EXPANSES":
      return {
        ...state,
        tableData: action.payload
      }
    case "ADD_NEW_MONTH_EXPANSE":
      return {
        ...state,
        tableData: action.payload
      }
    case "FETCHING_FAILED":
      return {
        ...state,
        expanses: {
          ...state.expanses,
          status: "error",
          error: action.payload
        }
      }
    case "UPDATE_DATE":
      return {
        ...state,
        date: {
          ...state.date,
          year: action.payload.year,
          month: action.payload.month,
          monthHeb: Helper.convertEngToHebMonth(action.payload.month)
        }
      }
    case "SET_CURRENT_DATE": return {
      ...state,
      date: Helper.getCurrentDate()
    }
    default: return state;
  }
}