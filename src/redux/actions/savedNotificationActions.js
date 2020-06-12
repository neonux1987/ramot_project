export const TYPES = {
  SAVED_NOTIFICATION_SHOW: "SAVED_NOTIFICATION_SHOW",
  SAVED_NOTIFICATION_HIDE: "SAVED_NOTIFICATION_HIDE"
}

export const showSavedNotification = () => {
  return dispatch => {

    dispatch({
      type: TYPES.SAVED_NOTIFICATION_SHOW,
      show: true
    });

  }
}

export const hideSavedNotification = () => {
  return dispatch => {

    dispatch({
      type: TYPES.SAVED_NOTIFICATION_HIDE,
      show: false
    });

  }
}