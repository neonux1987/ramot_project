// LIBRARIES
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// ACTIONS
import { fetchSummarizedSections } from "../../../redux/actions/summarizedSectionsActions";
import { addBudgetExecution } from "../../../redux/actions/budgetExecutionsActions";

// COMPONENTS
import AddBudgetExecution from "./AddBudgetExecution";

// TOASTS
import { toastManager } from "../../../toasts/toastManager";

const AddBudgetExecutionContainer = (props) => {
  const dispatch = useDispatch();

  const [formInputs, setFormInputs] = useState("");

  const summarizedSections = useSelector((store) => store.summarizedSections);

  const { isFetching, data } = summarizedSections;

  const { buildingId, date, show } = props;

  useEffect(() => {
    dispatch(fetchSummarizedSections("active"));
  }, [dispatch]);

  const reactSelectOnChangeHandler = (option) => {
    setFormInputs({
      ...formInputs,
      ...option
    });
  };

  const add = async () => {
    const params = {
      buildingId,
      date,
      payload: formInputs
    };

    if (formInputs === "") toastManager.error("נא לבחור סעיף מסכם");
    else if (date.year === undefined) {
      // send the error to the notification center
      toastManager.error("לא ניתן להוסיף שורה לדוח ריק");
      return;
    } else dispatch(addBudgetExecution(params));
  };

  return (
    <AddBudgetExecution
      show={show}
      add={add}
      formInputs={formInputs}
      isFetching={isFetching}
      data={data}
      reactSelectOnChangeHandler={reactSelectOnChangeHandler}
    />
  );
};

export default AddBudgetExecutionContainer;
