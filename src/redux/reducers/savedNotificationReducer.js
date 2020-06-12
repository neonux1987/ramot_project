import { TYPES } from '../actions/savedNotificationActions';

const initState = {
  show: false
}

export default (state = initState, action) => {
  const { show } = action;
  switch (action.type) {
    case TYPES.SAVED_NOTIFICATION_SHOW:
      return { show };
    case TYPES.SAVED_NOTIFICATION_HIDE:
      return { show };
    default: return state;
  }
}