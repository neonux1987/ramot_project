import { TYPES } from "../actions/routerPromptActions";

const initState = {
  dirty: false
};

const routerPromptReducer = (state = initState, action) => {
  const { dirty } = action;
  switch (action.type) {
    case TYPES.ROUTER_PROMPT_SET_DIRTY:
      return { dirty };
    default:
      return state;
  }
};

export default routerPromptReducer;
