// TYPES
export const TYPES = {
  SET_PRINT_MODE: "SET_PRINT_MODE"
}

export const setPrintMode = function (printMode) {
  return dispatch => {
    dispatch({
      type: TYPES.SET_PRINT_MODE,
      printMode
    });
  }
}


