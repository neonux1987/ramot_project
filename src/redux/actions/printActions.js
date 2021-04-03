// TYPES
export const TYPES = {
  SET_PRINT_MODE: "SET_PRINT_MODE"
}

export const setPrintMode = function (enabled) {
  return dispatch => {
    dispatch({
      type: TYPES.SET_PRINT_MODE,
      enabled
    });
  }
}


