// LIBRARIES
import React, { useState } from "react";
import useFormLogic from "../../../../../../../customHooks/useFormLogic";
import { addExpanseCode } from "../../../../../../../redux/actions/expansesCodesActions";
import { toastManager } from "../../../../../../../toasts/toastManager";
import { useDispatch } from "react-redux";
import AddExpanseCode from "./AddExpanseCode";

const AddExpanseCodeContainer = ({ show, summarizedSections, dataExist }) => {
  const { reset, changeHandler } = useFormLogic();
  const dispatch = useDispatch();

  const [formInputs, setFormInput] = useState({
    code: "",
    codeName: "",
    summarized_section_id: "",
    with_vat: 0
  });

  const submitHandler = (formInputs) => {
    const valid = validateFormInputs(formInputs);

    if (!valid) {
      toastManager.error("כל השדות לא יכולים להיות ריקים.");
      return;
    }

    const exist = dataExist(formInputs.code);
    if (exist) {
      toastManager.error("הקוד כבר קיים ברשימה, לא ניתן להוסיף את אותו הקוד.");
      return;
    }

    const expanseCode = parseFormInputs(formInputs);
    dispatch(addExpanseCode(expanseCode));
  };

  const parseFormInputs = (formInputs) => {
    const copyFormInputs = { ...formInputs };
    copyFormInputs.code = Number.parseInt(formInputs.code);
    return copyFormInputs;
  };

  const validateFormInputs = (formInputs) => {
    if (
      formInputs.code === "" ||
      formInputs.codeName === "" ||
      formInputs.summarized_section_id === ""
    ) {
      return false;
    }
    return true;
  };

  const onChange = (event) => {
    changeHandler(event, formInputs, setFormInput);
  };

  return (
    <AddExpanseCode
      reset={reset}
      formInputs={formInputs}
      submitHandler={submitHandler}
      show={show}
      onChange={onChange}
      setFormInput={setFormInput}
      summarizedSections={summarizedSections}
    />
  );
};

export default AddExpanseCodeContainer;
