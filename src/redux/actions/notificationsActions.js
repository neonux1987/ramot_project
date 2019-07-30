
const addNotification = (notification) => {
  return (dispatch, getState) => {
    const state = getState();
    //set a unique id
    notification.id = state.notifications.notificationCount;
    //set notification date
    notification.date = new Date();
    //increment notification count by 1 for new id for next notification
    dispatch(incNotificationCount());
    //add the notification
    dispatch(setNotification(notification));
    //remove the notification after x mili seconds
  }

}

/**
 * set notification
 */
const setNotification = (notification) => {
  return {
    type: "SET_NOTIFICATION",
    payload: notification
  };
};

/**
 * remove notification
 * @param {*} payload 
 */
const removeNotification = (notificationId) => {
  return {
    type: "REMOVE_NOTIFICATION",
    payload: notificationId
  };
};

const incNotificationCount = () => {
  return {
    type: "INC_NOTIFICATION_COUNT"
  };
}

export default {
  addNotification,
  setNotification,
  removeNotification
};