// LIBRARIES
import React, { useState } from "react";
import { useDispatch } from "react-redux";

// CSS

// ACTIONS


// COMPONENTS

// COMPONENTS WITH SOUND
import ButtonWithSound from "../../../../../componentsWithSound/ButtonWithSound/ButtonWithSound";

// TOASTS
import { toastManager } from "../../../../../toasts/toastManager";
import AddBoxContainer from "../../../../../components/AddBoxContainer/AddBoxContainer";
import { TextField } from "@material-ui/core";
import AddNewBuilding from "./AddNewBuilding";


const AddNewBuildingContainer = (props) => {

  const dispatch = useDispatch();

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
      dispatch(addBudgetExecution(params)); */
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