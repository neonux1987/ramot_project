import { TYPES } from "../actions/buildingsColorsActions";
import { getBuildings } from "./util/util";

const initState = {};

getBuildings().forEach(({ buildingId, color }) => {
  initState[buildingId] = color;
});

const buildingsColorsReducer = (state = initState, action) => {
  switch (action.type) {
    case TYPES.BUILDINGS_COLORS_UPDATE_COLOR:
      const { buildingId, color } = action;
      return {
        ...state,
        [buildingId]: color
      };
    default:
      return state;
  }
};

export default buildingsColorsReducer;
