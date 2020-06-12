import { TYPES } from '../actions/goodByeActions';

const initState = {
  dirty: false
}

export default (state = initState, action) => {
  const { dirty } = action;
  switch (action.type) {
    case TYPES.GOODBYE_SET_DIRTY:
      return { dirty };
    default: return state;
  }
}