import { useCallback } from "react";

const useBuildingColor = () => {

  const getBuildingColor = useCallback((buildingId) => {
    const { buildings } = require('electron').remote.getGlobal('sharedObject');

    let finalColor = "#a5a5a5";

    buildings.forEach(({ id, color }) => {

      if (id === buildingId)
        finalColor = color;
    });

    return finalColor;
  }, []);

  return [getBuildingColor];
};

export default useBuildingColor;