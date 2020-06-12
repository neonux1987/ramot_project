export const TYPES = {
  GOODBYE_SET_DIRTY: "GOODBYE_SET_DIRTY"
}

export const setDirty = (dirty = true) => {
  return dispatch => {

    dispatch({
      type: TYPES.GOODBYE_SET_DIRTY,
      dirty
    });

  }
}