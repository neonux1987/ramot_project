// TYPES
export const TYPES = {
  SET_FULLSCREEN_MODE: "SET_FULLSCREEN_MODE"
}

export const setFullScreenMode = function () {
  return dispatch => {
    dispatch({
      type: TYPES.SET_FULLSCREEN_MODE
    });
  }
}