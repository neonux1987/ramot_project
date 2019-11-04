
const initState = {
  monthTotal: {
    isFetching: false,
    status: "",
    error: "",
    data: []
  }
}

export default (state = initState, action) => {
  switch (action.type) {
    case "RECEIVE_MONTH_TOTAL":
      return {
        ...state,
        monthTotal: {
          ...state.monthTotal,
          isFetching: false,
          status: "success",
          data: action.data
        }
      }
    case "REQUEST_MONTH_TOTAL":
      return {
        ...state,
        monthTotal: {
          ...state.monthTotal,
          isFetching: true
        }
      }
    case "UPDATE_SINGLE_MONTH_TOTAL": {

      const monthTotalArr = [...state.monthTotal.data];
      monthTotalArr[action.index] = action.monthTotalObj;

      return {
        ...state,
        monthTotal: {
          ...state.monthTotal,
          data: monthTotalArr
        }
      }
    }
    case "MONTH_TOTAL_FETCHING_FAILED":
      return {
        ...state,
        monthTotal: {
          ...state.monthTotal,
          status: "error",
          error: action.payload
        }
      }
    case "CLEANUP_MONTH_TOTAL":
      return {
        ...state,
        monthTotal: {
          isFetching: false,
          status: "",
          error: "",
          data: []
        }
      }
    default: return state;
  }
}