import Helper from '../../helpers/Helper';
import { TYPES } from '../actions/budgetExecutionActions';

const initState = {
  pageName: "budgetExecution",
  headerTitle: "מעקב ביצוע מול תקציב",
  pageIndex: -1,
  pages: []
}

export default (state = initState, action) => {
  switch (action.type) {
    case TYPES.RECEIVE_BUDGET_EXECUTIONS:
      {
        //copy data to avoid mutating the state directly
        const copyPages = [...state.pages];

        //make the changes
        copyPages[state.pageIndex].isFetching = false;
        copyPages[state.pageIndex].status = "success";
        copyPages[state.pageIndex].data = action.data.data;
        copyPages[state.pageIndex].date = action.date;
        copyPages[state.pageIndex].pageSettings = action.data.info;

        return {
          ...state,
          pages: copyPages
        }
      }
    case TYPES.REQUEST_BUDGET_EXECUTIONS:
      {
        //copy data to avoid mutating the state directly
        const copyPages = [...state.pages];
        //find the index of the current page in the array of pages
        const index = Helper.findIndexOfPage(action.page, copyPages);
        //make the changes
        copyPages[index].isFetching = true;

        return {
          ...state,
          pages: copyPages
        }
      }
    case TYPES.ADD_BUDGET_EXECUTION:
      return {
        ...state,
        tableData: action.payload
      }
    case TYPES.BUDGET_EXECUTIONS_FETCHING_FAILED:
      {
        //copy data to avoid mutating the state directly
        const copyPages = [...state.pages];

        //make the changes
        copyPages[state.pageIndex].status = "error";
        copyPages[state.pageIndex].error = action.error;

        return {
          ...state,
          pages: copyPages
        }
      }
    case TYPES.UPDATE_BUDGET_EXECUTION:
      {
        //copy data to avoid mutating the state directly
        const copyPages = [...state.pages];
        //make the changes
        copyPages[state.pageIndex].data[action.index] = action.newBudgetExecution;

        return {
          ...state,
          pages: copyPages
        }
      }
    case TYPES.INIT_BUDGET_EXECUTIONS_STATE:
      {
        const initPages = [...state.pages];
        const page = {
          buildingNameEng: action.page,
          date: {
            ...Helper.getCurrentQuarterDate(),
          },
          isFetching: false,
          status: "",
          error: "",
          data: [],
          pageSettings: {
            count: 0
          }
        }
        initPages.push(page);
        const pageIndex = Helper.findIndexOfPage(action.page, initPages);
        return {
          ...state,
          pageIndex: pageIndex,
          pages: initPages
        }
      }
    case TYPES.BUDGET_EXECUTIONS_CLEANUP:
      {
        let copiedPages = [...state.pages];
        Helper.removePageFromArray(action.page, copiedPages);
        const pageIndex = Helper.findIndexOfPage(state.pages[state.pageIndex].buildingNameEng, copiedPages);
        return {
          ...state,
          pageIndex: pageIndex,
          pages: copiedPages
        }
      }
    default: return state;
  }
}