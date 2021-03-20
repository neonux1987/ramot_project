const initState = {
  showSidebar: true
}

const toggleSidebarReducer = (state = initState, action) => {
  switch (action.type) {
    case "SIDEBAR_TOGGLE":
      return {
        ...state,
        showSidebar: !state.showSidebar
      }
    default: return state;
  }
}

export default toggleSidebarReducer;