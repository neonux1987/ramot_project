import { useCallback } from "react";
import { useSelector } from "react-redux";

const useBuildingColor = () => {
  const { data } = useSelector(store => store.buildings);

  const getBuildingColor = useCallback((buildingId) => {
    let finalColor = "#a5a5a5";

    data.forEach(({ id, color }) => {
      if (id === buildingId)
        finalColor = color;
    });

    return finalColor;
  }, [data]);

  return [getBuildingColor];
};

export default useBuildingColor;