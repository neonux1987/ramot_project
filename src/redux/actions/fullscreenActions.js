// TYPES
export const TYPES = {
  TOGGLE_FULLSCREEN_MODE: "TOGGLE_FULLSCREEN_MODE"
}

export const toggleFullScreenMode = function () {
  return dispatch => {
    dispatch({
      type: TYPES.TOGGLE_FULLSCREEN_MODE
    });
  }
}