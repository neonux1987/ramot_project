const initState = {
  tableData: []
}

export default (state = initState, action) => {
  switch (action.type) {
    case "GET_SUMMARIZED_SECTIONS":
      return {
        ...state,
        tableData: action.payload
      }
    default: return state;
  }
}