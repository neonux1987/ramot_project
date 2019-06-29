
/**
 * set notification
 */
const setNotification = (notification) => {
  return {
    type: "SET_NOTIFICATION",
    notification
  };
};

/**
 * remove notification
 * @param {*} payload 
 */
const removeNotification = (notificationId) => {
  return {
    type: "REMOVE_NOTIFICATION",
    payload: payload
  };
};


export default {
  setNotification,
  updateDate
};