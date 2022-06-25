export const TYPES = {
  ROUTER_PROMPT_SET_DIRTY: "ROUTER_PROMPT_SET_DIRTY"
};

export const setDirty = (dirty = true) => {
  return (dispatch) => {
    dispatch({
      type: TYPES.ROUTER_PROMPT_SET_DIRTY,
      dirty
    });
  };
};
