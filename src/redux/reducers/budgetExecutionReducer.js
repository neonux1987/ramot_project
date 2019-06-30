import Helper from '../../helpers/Helper';

const initState = {
  pageName: "budgetExecution",
  headerTitle: "מעקב ביצוע מול תקציב",
  date: Helper.getCurrentDate(),
  budgetExecutions: {
    isFetching: false,
    status: "",
    error: "",
    data: []
  }
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