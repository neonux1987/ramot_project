const initState = {
  notificationCount: 0,
  notifications: []
}

export default (state = initState, action) => {
  switch (action.type) {
    case "SET_NOTIFICATION": {
      const copyData = [...state.notifications];
      copyData.push(action.payload);
      return {
        ...state,
        notifications: copyData
      }
    }
    case "REMOVE_NOTIFICATION": {
      let copyData = [...state.notifications];
      copyData = copyData.filter((value, index, arr) => {
        return value === action.payload;
      })
      return {
        ...state,
        notifications: copyData
      }
    }
    case "INC_NOTIFICATION_COUNT": {
      return {
        ...state,
        notificationCount: state.notificationCount + 1
      }
    }
    default: return state;
  }
}