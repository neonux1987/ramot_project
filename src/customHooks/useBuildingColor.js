import { useCallback } from "react";

const useBuildingColor = () => {

  const getBuildingColor = useCallback((buildingId) => {
    const { buildings } = require('electron').remote.getGlobal('sharedObject');

    let finalColor = "#0e7ab9";

    buildings.forEach(({ id, color }) => {

      if (id === buildingId)
        finalColor = color;
    });

    return finalColor;
  }, []);

  return [getBuildingColor];
};

export default useBuildingColor;