import { TYPES } from "../actions/fullscreenActions";

const initialState = {
  isFullscreen: false
}

const fullscreenReducer = (state = initialState, action) => {
  switch (action.type) {
    case TYPES.TOGGLE_FULLSCREEN_MODE: {
      return {
        ...state,
        isFullscreen: !state.isFullscreen
      };
    }
    default: return state;
  }

}

export default fullscreenReducer;
