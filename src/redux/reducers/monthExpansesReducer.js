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

  pages: null
}

export default (state = initState, action) => {
  switch (action.type) {
    case "RECEIVE_MONTH_EXPANSES":
      return {
        ...state,
        pages: {
          ...state.pages,
          [action.page]: {
            ...state.pages[action.page],
            isFetching: false,
            status: "success",
            data: action.data
          }
        }
      }
    case "REQUEST_MONTH_EXPANSES":
      return {
        ...state,
        pages: {
          ...state.pages,
          [action.page]: {
            ...state.pages[action.page],
            isFetching: true,
          }
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
      return {
        ...state,
        pages: {
          [action.page]: {
            date: Helper.getCurrentDate(),
            isFetching: false,
            status: "",
            error: "",
            data: []
          }
        }
      }
    case "SET_CURRENT_DATE": return {
      ...state,
      date: Helper.getCurrentDate()
    }
    default: return state;
  }
}