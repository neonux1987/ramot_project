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
    case "Some_action":
      return {
        ...state
      }
    default: return state;
  }
}