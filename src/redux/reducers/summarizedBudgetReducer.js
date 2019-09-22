import Helper from '../../helpers/Helper';

const initState = {
  pageName: "summarizedBudget",
  headerTitle: "סיכום תקציבי",
  pageIndex: -1,
  pages: []
}

export default (state = initState, action) => {
  switch (action.type) {
    case "RECEIVE_SUMMARIZED_BUDGETS":
      {
        const copyPages = [...state.pages];
        copyPages[state.pageIndex] = {
          ...copyPages[state.pageIndex],
          isFetching: false,
          status: "success",
          data: action.data
        }
        return {
          ...state,
          pages: copyPages
        }
      }
    case "REQUEST_SUMMARIZED_BUDGETS":
      {
        const copyPages = [...state.pages];
        const index = Helper.findIndexOfPage(action.page, copyPages);
        copyPages[index] = {
          ...copyPages[index],
          isFetching: true,
        };
        return {
          ...state,
          pages: copyPages
        }
      }
    case "FETCHING_FAILED":
      {
        const copyPages = [...state.pages];//copy data to not mess with the original
        copyPages[state.pageIndex] = {
          ...copyPages[state.pageIndex],
          status: "error",
          error: action.payload
        }
        return {
          ...state,
          pages: copyPages
        }
      }
    case "INIT_STATE":
      {
        const initPages = [...state.pages];
        const page = {
          buildingNameEng: action.page,
          date: {
            year: Helper.getCurrentYear()
          },
          isFetching: false,
          status: "",
          error: "",
          data: []
        }
        initPages.push(page);
        const pageIndex = Helper.findIndexOfPage(action.page, initPages);
        return {
          ...state,
          pageIndex: pageIndex,
          pages: initPages
        }
      }
    case "CLEANUP":
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
    case "UPDATE_DATE":
      {
        const copyPages = [...state.pages];//copy data to not mess with the original
        copyPages[state.pageIndex] = {
          ...copyPages[state.pageIndex],
          date: {
            ...state.date,
            ...action.payload
          }
        }
        return {
          ...state,
          pages: copyPages
        }
      }
    case "SET_CURRENT_DATE":
      {
        const copyPages = [...state.pages];//copy data to not mess with the original
        copyPages[state.pageIndex] = {
          ...copyPages[state.pageIndex],
          date: {
            year: Helper.getCurrentYear()
          }
        }
        return {
          ...state,
          pages: copyPages
        }
      }
    default: return state;
  }
}