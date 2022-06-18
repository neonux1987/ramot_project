// LIBRARIES
import React, { useState } from "react";
import { addBuilding } from "../../../../../redux/actions/buildingsActions";
import { useDispatch } from "react-redux";

// TOASTS
import { toastManager } from "../../../../../toasts/toastManager";

// COMPONENTS
import AddBuilding from "./AddBuilding";

const AddBuildingContainer = (props) => {
  const dispatch = useDispatch();

  const [buildingName, setBuildingName] = useState("");

  const { show, isBuildingExist } = props;

  const onChangeHandler = (event) => {
    const target = event.target;

    setBuildingName(target.value);
  };

  const add = async () => {
    if (buildingName === "") toastManager.error("שם בניין לא יכול להיות ריק");
    else {
      if (isBuildingExist(buildingName))
        toastManager.error(`בניין עם השם ${buildingName} כבר קיים`);
      else {
        dispatch(addBuilding({ buildingName }));
        setBuildingName("");
      }
    }
  };

  return (
    <AddBuilding
      show={show}
      buildingName={buildingName}
      onChangeHandler={onChangeHandler}
      add={add}
    />
  );
};

export default AddBuildingContainer;
