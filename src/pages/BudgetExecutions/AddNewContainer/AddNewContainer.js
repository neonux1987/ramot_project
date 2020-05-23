// LIBRARIES
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@material-ui/core";

// CSS
import {
  container,
  buttonWrapper,
  addButton,
  reactSelectStyle
} from './AddNewContainer.module.css'

// ACTIONS
import { fetchSummarizedSections } from "../../../redux/actions/summarizedSectionsActions";
import { addBudgetExecution } from "../../../redux/actions/budgetExecutionsActions";

// COMPONENTS
import ReactSelect from "../../../components/ReactSelect/ReactSelect";
import { myToaster } from "../../../Toasts/toastManager";

const AddNewContainer = (props) => {

  const dispatch = useDispatch();

  const [formInputs, setFormInputs] = useState("");

  const summarizedSections = useSelector(store => store.summarizedSections);

  const {
    isFetching,
    data
  } = summarizedSections;

  const {
    buildingName,
    date
  } = props;

  useEffect(() => {
    dispatch(fetchSummarizedSections("active"));
  }, [dispatch]);

  const reactSelectOnChangeHandler = (option) => {

    setFormInputs({
      ...formInputs,
      ...option
    })
  }

  const add = async () => {
    const params = {
      buildingName,
      date,
      payload: formInputs
    }

    if (formInputs === "")
      myToaster.error("נא לבחור סעיף מסכם")
    else
      dispatch(addBudgetExecution(params));
  }

  return (
    <form className={container} noValidate autoComplete="off" onChange={() => { }} >

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
        <Button
          name="submit"
          variant="contained"
          color="primary"
          onClick={add}
          className={addButton}
          disabled={isFetching}
        >
          הוסף
        </Button>
      </div>

    </form>
  )
}

export default AddNewContainer;