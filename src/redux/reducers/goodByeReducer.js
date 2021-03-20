import { TYPES } from '../actions/goodByeActions';

const initState = {
  dirty: false
}

const goodByeReducer = (state = initState, action) => {
  const { dirty } = action;
  switch (action.type) {
    case TYPES.GOODBYE_SET_DIRTY:
      return { dirty };
    default: return state;
  }
}

export default goodByeReducer;