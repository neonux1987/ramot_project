import React from 'react';

const useFormLogic = () => {
  const changeHandler = (event, formInputs, setFormInput) => {
    let target = event.target;
    setFormInput({
      ...formInputs,
      [target.name]: target.value
    });
  }

  const reset = (resettedInputs, setFormInput) => {
    setFormInput(resettedInputs);
  }

  return { changeHandler, reset };
}

export default useFormLogic;