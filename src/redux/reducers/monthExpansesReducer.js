import Helper from '../../helpers/Helper';

const initState = {
  pageName: "monthExpanses",
  headerTitle: "מעקב הוצאות חודשיות",
  date: Helper.getCurrentDate(),
  expanses: {
    isFetching: true,
    status: "",
    error: "",
    data: []
  },
  pageIndex: -1,
  pages: []
}

export default (state = initState, action) => {
  switch (action.type) {
    case "RECEIVE_MONTH_EXPANSES":
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
    case "REQUEST_MONTH_EXPANSES":
      {
        const copyPages = [...state.pages];
        const index = Helper.findIndexOfPage(action.page, copyPages);
        copyPages[index] = {
          ...copyPages[index],
          isFetching: true,
        }
        return {
          ...state,
          pages: copyPages
        }
      }

    case "UPDATE_MONTH_EXPANSE":
      {
        const expanse = action.payload.expanse;//expanse object to update
        const index = action.payload.index;//index number of the expanse object in the array of data
        const copyData = [...state.expanses.data];//copy data to not mess with the original

        //replace the old object with the updated object
        copyData[index] = expanse;

        return {
          ...state,
          expanses: {
            ...state.expanses,
            data: copyData
          }
        }
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
          ...action.payload,
          quarter: Helper.getCurrentQuarter(action.payload.monthNum),
          quarterHeb: Helper.getQuarterHeb(Helper.getCurrentQuarter(action.payload.monthNum))
        }
      }
    case "INIT_STATE":
      {
        const initPages = [...state.pages];
        const page = {
          buildingNameEng: action.page,
          date: Helper.getCurrentDate(),
          isFetching: false,
          status: "",
          error: "",
          data: []
        }
        initPages.push(page);
        const pageIndex = Helper.findIndexOfPage(page, initPages);
        return {
          ...state,
          pageIndex: pageIndex,
          pages: initPages
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