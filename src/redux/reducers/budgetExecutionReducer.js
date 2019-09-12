import Helper from '../../helpers/Helper';

const initState = {
  pageName: "budgetExecution",
  headerTitle: "מעקב ביצוע מול תקציב",
  date: Helper.getCurrentDate(),
  budgetExecutions: {
    isFetching: true,
    status: "",
    error: "",
    data: []
  },
  pages: []
}

export default (state = initState, action) => {
  switch (action.type) {
    case "RECEIVE_BUDGET_EXECUTIONS":
      return {
        ...state,
        budgetExecutions: {
          ...state.budgetExecutions,
          isFetching: false,
          status: "success",
          data: action.data
        }
      }
    case "REQUEST_BUDGET_EXECUTIONS":
      return {
        ...state,
        budgetExecutions: {
          ...state.budgetExecutions,
          isFetching: true,
        }
      }
    case "ADD_BUDGET_EXECUTION":
      return {
        ...state,
        tableData: action.payload
      }
    case "FETCHING_FAILED":
      return {
        ...state,
        budgetExecutions: {
          ...state.budgetExecutions,
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
    case "CLEANUP":
      {
        let copiedPages = [...state.pages];
        Helper.removePageFromArray(action.page, copiedPages);
        const pageIndex = Helper.findIndexOfPage(state.pages[state.pageIndex], copiedPages);
        return {
          ...state,
          pageIndex: pageIndex,
          pages: copiedPages
        }
      }
    default: return state;
  }
}