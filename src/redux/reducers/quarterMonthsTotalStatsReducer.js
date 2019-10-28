
const initState = {
  registeredMonths: {
    isFetching: false,
    status: "",
    error: "",
    data: []
  }
}

export default (state = initState, action) => {
  switch (action.type) {
    case "RECEIVE_QUARTER_MONTHS_TOTAL":
      return {
        ...state,
        quarterMonthsTotal: {
          ...state.quarterMonthsTotal,
          isFetching: false,
          status: "success",
          data: action.data
        }
      }
    case "REQUEST__QUARTER_MONTHS_TOTAL":
      return {
        ...state,
        quarterMonthsTotal: {
          ...state.quarterMonthsTotal,
          isFetching: true
        }
      }
    case "REGISTERED_MONTHS_FETCHING_FAILED":
      return {
        ...state,
        quarterMonthsTotal: {
          ...state.quarterMonthsTotal,
          status: "error",
          error: action.payload
        }
      }
    case "CLEANUP_QUARTER_MONTHS_TOTAL":
      return {
        ...state,
        quarterMonthsTotal: {
          isFetching: false,
          status: "",
          error: "",
          data: []
        }
      }
    default: return state;
  }
}