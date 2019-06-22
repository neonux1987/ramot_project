const initState = {
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