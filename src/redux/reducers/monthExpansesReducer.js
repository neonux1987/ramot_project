import Helper from '../../helpers/Helper';

const initState = {
  pageName: "monthExpanses",
  headerTitle: "מעקב הוצאות חודשיות",
  date: {
    year: Helper.getCurrentYear(),
    month: Helper.getCurrentMonthEng(),
    monthHeb: Helper.getCurrentMonthHeb(),
    quarter: Helper.getCurrentQuarter()
  },
  tableHeaders: [],
  tableData: []
}

export default (state = initState, action) => {
  switch (action.type) {
    case "GET_MONTH_EXPANSES":
      return {
        ...state,
        tableData: action.payload
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
      date: {
        year: Helper.getCurrentYear(),
        month: Helper.getCurrentMonthEng(),
        monthHeb: Helper.getCurrentMonthHeb(),
        quarter: Helper.getCurrentQuarter()
      }
    }
    default: return state;
  }
}