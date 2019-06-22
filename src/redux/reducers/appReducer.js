import Helper from '../../helpers/Helper';

const initState = {
  date: {
    year: Helper.getCurrentYear(),
    month: Helper.getCurrentMonthEng(),
    monthHeb: Helper.getCurrentMonthHeb(),
    quarter: Helper.getCurrentQuarter()
  }
}

export default (state = initState, action) => {
  switch (action.type) {
    case "something":
      return {
        ...state,
        toggleSidebar: action.payload
      }
    default: return state;
  }
}