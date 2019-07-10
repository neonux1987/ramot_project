import Helper from '../../helpers/Helper';

const initState = {
  pageName: "summarizedBudget",
  headerTitle: "סיכום תקציבי",
  date: Helper.getCurrentDate(),
  summarizedBudgets: {
    isFetching: true,
    status: "",
    error: "",
    data: []
  }
}

export default (state = initState, action) => {
  switch (action.type) {
    case "RECEIVE_SUMMARIZED_BUDGETS":
      return {
        ...state,
        summarizedBudgets: {
          ...state.summarizedBudgets,
          isFetching: false,
          status: "success",
          data: action.data
        }
      }
    case "REQUEST_SUMMARIZED_BUDGETS":
      return {
        ...state,
        summarizedBudgets: {
          ...state.summarizedBudgets,
          isFetching: true,
        }
      }
    case "FETCHING_FAILED":
      return {
        ...state,
        summarizedBudgets: {
          ...state.summarizedBudgets,
          status: "error",
          error: action.payload
        }
      }
    default: return state;
  }
}