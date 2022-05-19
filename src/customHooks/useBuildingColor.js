import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateBuilding } from "../redux/actions/buildingsActions";
import { updateColor } from "../redux/actions/buildingsColorsActions";

/* 
  this hooks provides a color based on building id
  used for themeing, displaying components in the 
  building specific color
*/
const useBuildingColor = (buildingId) => {

  const dispatch = useDispatch();
  const { data } = useSelector(store => store.buildings);
  const buildingsColors = useSelector(store => store.buildingsColors);

  const changeCompleteUpdate = useCallback((color) => {

    data.forEach((building, index) => {

      if (building.id === buildingId && color.hex !== building.color) {
        const newBuilding = { ...building };
        newBuilding.color = color.hex;
        dispatch(updateBuilding(buildingId, newBuilding, building, index));
      }

    });

  }, [dispatch, data, buildingId]);

  const changeBuildingColor = useCallback((buildingId, colorValue) => {

    dispatch(updateColor(buildingId, colorValue));

  }, [dispatch]);

  const buildingColor = buildingsColors[buildingId] === undefined ? "#0e7ab9" : buildingsColors[buildingId];
  return [buildingColor, changeBuildingColor, changeCompleteUpdate];
};

export default useBuildingColor;