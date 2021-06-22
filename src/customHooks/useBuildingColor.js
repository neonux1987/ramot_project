import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateBuilding } from "../redux/actions/buildingsActions";

const useBuildingColor = () => {

  const dispatch = useDispatch();
  const { data } = useSelector(store => store.buildings);

  const getBuildingColor = useCallback((buildingId) => {

    let finalColor = "#0e7ab9";

    data.forEach(({ id, color }) => {

      if (id === buildingId)
        finalColor = color;
    });

    return finalColor;
  }, [data]);

  const changeBuildingColor = useCallback((buildingId, colorValue) => {

    data.forEach(({ id }, index) => {

      if (id === buildingId) {
        const newBuilding = { ...data[index] };
        newBuilding.color = colorValue;
        dispatch(updateBuilding(buildingId, newBuilding, data[index], index));
      }

    });

  }, [dispatch, data]);

  return [getBuildingColor, changeBuildingColor];
};

export default useBuildingColor;