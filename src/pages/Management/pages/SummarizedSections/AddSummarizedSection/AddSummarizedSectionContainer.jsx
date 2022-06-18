import React, { useState } from "react";
import { useDispatch } from "react-redux";
import useFormLogic from "../../../../../customHooks/useFormLogic";
import { toastManager } from "../../../../../toasts/toastManager";
import AddSummarizedSection from "./AddSummarizedSection";
import { addSummarizedSection } from "../../../../../redux/actions/summarizedSectionsActions";

const AddSummarizedSectionContainer = ({ show, dataExist }) => {
  const { reset, changeHandler } = useFormLogic();
  const dispatch = useDispatch();

  const [formInputs, setFormInput] = useState({
    section: ""
  });

  const onChange = (event) => {
    changeHandler(event, formInputs, setFormInput);
  };

  const onReset = () => {
    reset({ section: "" }, setFormInput);
  };

  const onSubmit = () => {
    const valid = validateFormInputs(formInputs);

    if (!valid) {
      toastManager.error("חובה לבחור סעיף!");
      return;
    }

    const exist = dataExist(formInputs.section);
    if (exist) {
      toastManager.error("הסעיף כבר קיים ברשימה, לא ניתן להוסיף סעיף שקיים.");
      return;
    }

    const summarizedSection = {
      section: formInputs.section
    };

    dispatch(addSummarizedSection({ summarizedSection }));
  };

  const validateFormInputs = (formInputs) => {
    if (formInputs.section === "") return false;
    else return true;
  };

  return (
    <AddSummarizedSection
      onSubmit={onSubmit}
      formInputs={formInputs}
      onChange={onChange}
      onReset={onReset}
      show={show}
    />
  );
};

export default AddSummarizedSectionContainer;
