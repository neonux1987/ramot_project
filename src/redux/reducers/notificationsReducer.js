const initState = {
  notificationCount: 0,
  notification: {
  }
}

export default (state = initState, action) => {
  switch (action.type) {
    case "SET_NOTIFICATION": {
      console.log(action.payload);
      /* const copyData = [...state.notifications];
      copyData.push(action.payload); */
      return {
        ...state,
        notification: action.payload
      }
    }
    case "REMOVE_NOTIFICATION": {
      /* let copyData = [...state.notifications];
      for (let i = 0; i < copyData.length; i++) {
        if (copyData[i].id === action.payload) {
          copyData.splice(i, 1);
        }
      } */
      return {
        ...state,
        notification: {}
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