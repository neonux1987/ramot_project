import React from 'react';

const withFormFunctionality = (WrappedComponent, logic) => {

  /**
  * on key enter press, move to th next input element
  * @param {*} event the event of the current clicked element
  * @param {*} nextElement the next element to forward to focus to
  */
  const inputEnterPress = (event, keys) => {
    //focus on next elemnt when finished by hitting enter or out of focus
    if (event.key === "Enter") {
      let index = keys.indexOf(event.target.name);//current selected element index in the array of keys
      let currenElement = event.target.form[keys[index]];//current selected form element
      //the next element to move the focus to
      let nextElement = event.target.form[keys[index + 1]]; console.log(currenElement); console.log(nextElement);
      nextElement.focus();
      if (logic) {
        logic(currenElement, nextElement, changeHandler, reset);
      }
      //if the next element is the button with id submit
      //activate the click event to send the form data
      if (nextElement.name === "submit") {
        nextElement.click();
        nextElement.blur();
      } else {
        if (nextElement.name !== "submit") nextElement.select();
      }
    }
  };

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

  return props => <WrappedComponent inputEnterPress={inputEnterPress} changeHandler={changeHandler} reset={reset} {...props} />;

}



export default withFormFunctionality;