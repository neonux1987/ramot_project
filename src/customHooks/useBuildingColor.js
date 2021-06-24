import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateBuilding } from "../redux/actions/buildingsActions";
import { updateColor } from "../redux/actions/buildingsColorsActions";

const useBuildingColor = (buildingId) => {

  const dispatch = useDispatch();
  const { data } = useSelector(store => store.buildings);
  const buildingsColors = useSelector(store => store.buildingsColors);

  const changeCompleteUpdate = useCallback((color) => {

    data.forEach(({ id }, index) => {

      if (id === buildingId) {
        const newBuilding = { ...data[index] };
        newBuilding.color = color.hex;
        dispatch(updateBuilding(buildingId, newBuilding, data[index], index));
      }

    });

  }, [dispatch, data]);

  const changeBuildingColor = useCallback((buildingId, colorValue) => {

    dispatch(updateColor(buildingId, colorValue));

  }, [dispatch]);

  const buildingColor = buildingsColors[buildingId] === undefined ? "#0e7ab9" : buildingsColors[buildingId];
  return [buildingColor, changeBuildingColor, changeCompleteUpdate];
};

export default useBuildingColor;