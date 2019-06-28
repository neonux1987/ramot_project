import Helper from '../../helpers/Helper';

const initState = {
  pageName: "monthExpanses",
  headerTitle: "מעקב ביצוע מול תקציב",
  date: Helper.getCurrentDate(),
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