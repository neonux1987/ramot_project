// LIBRARIES
import React, { useState } from "react";
import { useDispatch } from "react-redux";

// CSS

// ACTIONS


// COMPONENTS

// TOASTS
import { toastManager } from "../../../../../toasts/toastManager";
import AddNewBuilding from "./AddNewBuilding";


const AddNewBuildingContainer = (props) => {

  //const dispatch = useDispatch();

  const [buildingName, setBuildingName] = useState("");

  const {
    show
  } = props;

  const onChangeHandler = event => {
    const target = event.target;

    setBuildingName(target.value);
  }

  const add = async () => {
    if (buildingName === "")
      toastManager.error("שם בניין לא יכול להיות ריק")
    /* else
      dispatch(addBudgetExecution({})); */
  }

  return (
    <AddNewBuilding
      show={show}
      buildingName={buildingName}
      onChangeHandler={onChangeHandler}
      add={add}
    />


  )
}

export default AddNewBuildingContainer;