// LIBRARIES
import React from "react";
import AddBoxContainer from "../../../../../components/AddBoxContainer/AddBoxContainer";
import { TextField } from "@material-ui/core";
import DefaultButton from "../../../../../components/buttons/DefaultButton";
import { css } from "emotion";

const _container = css`
  margin: 0 15px 15px;
  display: flex;
  align-items: center;
`;

const _button = css`
  margin-right: 10px;
`;

const AddBuilding = (props) => {
  const { show, buildingName, onChangeHandler, add } = props;

  return (
    <AddBoxContainer show={show}>
      <div className={_container}>
        <TextField
          name="section"
          label="הזן שם בניין"
          type="text"
          onChange={onChangeHandler}
          value={buildingName}
          autoFocus
        />

        <DefaultButton
          name="submit"
          variant="contained"
          color="primary"
          onClick={add}
          className={_button}
        >
          הוסף
        </DefaultButton>
      </div>
    </AddBoxContainer>
  );
};

export default AddBuilding;
