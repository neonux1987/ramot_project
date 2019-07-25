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
      for (let i = 0; i < copyData.length; i++) {
        if (copyData[i].id === action.payload) {
          copyData.splice(i, 1);
        }
      }
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