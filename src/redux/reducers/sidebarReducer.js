const initState = {
  toggleSidebar: true,
  activeButton: {
    id: 99
  }
}

export default (state = initState, action) => {
  switch (action.type) {
    case "TOGGLE_SIDEBAR":
      return {
        ...state,
        toggleSidebar: action.payload
      }
    case "SAVE_HISTORY":
      return {
        ...state,
        history: action.payload
      }
    default: return state;
  }
}