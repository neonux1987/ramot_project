// LIBRARIES
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// CSS
import {
  buttonWrapper,
  addButton,
  reactSelectStyle
} from './AddNewContainer.module.css'

// ACTIONS
import { fetchSummarizedSections } from "../../../redux/actions/summarizedSectionsActions";
import { addBudgetExecution } from "../../../redux/actions/budgetExecutionsActions";

// COMPONENTS
import ReactSelect from "../../../components/ReactSelect/ReactSelect";

// COMPONENTS WITH SOUND
import ButtonWithSound from "../../../componentsWithSound/ButtonWithSound/ButtonWithSound";

// TOASTS
import { toastManager } from "../../../toasts/toastManager";
import AddBoxContainer from "../../../components/AddBoxContainer/AddBoxContainer";


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
      toastManager.error("נא לבחור סעיף מסכם")
    else if (date.year === undefined) {
      // send the error to the notification center
      toastManager.error("לא ניתן להוסיף שורה לדוח ריק");
      return;
    }
    else
      dispatch(addBudgetExecution(params));
  }

  return (
    <AddBoxContainer>

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
        <ButtonWithSound
          name="submit"
          variant="contained"
          color="primary"
          onClick={add}
          className={addButton}
          disabled={isFetching}
        >
          הוסף
        </ButtonWithSound>
      </div>

    </AddBoxContainer>
  )
}

export default AddNewContainer;