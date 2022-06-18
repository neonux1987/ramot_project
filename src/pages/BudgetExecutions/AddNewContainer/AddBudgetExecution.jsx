// LIBRARIES
import React from "react";

// CSS
import {
  buttonWrapper,
  reactSelectStyle
} from "./AddBudgetExecution.module.css";

// COMPONENTS
import ReactSelect from "../../../components/ReactSelect/ReactSelect";
import WhiteButton from "../../../components/buttons/WhiteButton";
import AddBoxContainer from "../../../components/AddBoxContainer/AddBoxContainer";

const AddBudgetExecution = ({
  show,
  add,
  formInputs,
  isFetching,
  data,
  reactSelectOnChangeHandler
}) => {
  return (
    <AddBoxContainer show={show}>
      <ReactSelect
        classes={{ root: reactSelectStyle }}
        inputValue={formInputs}
        onChangeHandler={reactSelectOnChangeHandler}
        options={data}
        getOptionLabel={(option) => option.section}
        getOptionValue={(option) => option.section}
        placeholder="בחר סעיף מסכם"
        inputId="sections"
        isLoading={isFetching}
        isDisabled={isFetching}
      />

      <div className={buttonWrapper}>
        <WhiteButton
          name="submit"
          variant="contained"
          color="primary"
          onClick={add}
          disabled={isFetching}
        >
          הוסף
        </WhiteButton>
      </div>
    </AddBoxContainer>
  );
};

export default AddBudgetExecution;
