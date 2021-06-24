export const TYPES = {
  BUILDINGS_COLORS_UPDATE_COLOR: "BUILDINGS_COLORS_UPDATE_COLOR"
}

export const updateColor = function (buildingId, color) {
  return {
    type: TYPES.BUILDINGS_COLORS_UPDATE_COLOR,
    buildingId,
    color
  }
};
