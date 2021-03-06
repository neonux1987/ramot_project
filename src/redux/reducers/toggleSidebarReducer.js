const initState = {
  showSidebar: true
}

export default (state = initState, action) => {
  switch (action.type) {
    case "SIDEBAR_TOGGLE":
      return {
        ...state,
        showSidebar: !state.showSidebar
      }
    default: return state;
  }
}