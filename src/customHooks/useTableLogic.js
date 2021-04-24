import { useState } from 'react';
import EditableInputColumn from '../components/table/components/EditableInputColumn';
import EditableTextareaColumn from '../components/table/components/EditableTextareaColumn';

const useTableLogic = () => {

  const [editMode, setEditMode] = useState(false);
  const [addNewMode, setAddNewMode] = useState(false);

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  const toggleAddNewMode = () => {
    setAddNewMode(!addNewMode);
  };

  const inputOnFocusHandler = (e) => {
    e.target.select();
  };

  const editableDivOnFocusHandler = (e) => {
    var range = document.createRange();
    range.selectNodeContents(e.target);
    var sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
  };

  const onKeyPressHandler = (e) => {
    if (e.key === "Enter") {
      e.target.blur();
    }
  };

  const textAreaInput = (key, value, index, onBlurHandler) => {
    return <EditableTextareaColumn
      value={value}
      key={key}
      data-key={key}
      data-index={index}
      onBlur={onBlurHandler}
      onFocus={editableDivOnFocusHandler}
    />
  };

  const textInput = (key, value, index, onBlurHandler, type = "text") => {
    return <EditableInputColumn
      value={value}
      type={type}
      key={key}
      data-key={key}
      data-index={index}
      onBlur={onBlurHandler}
      onKeyPress={onKeyPressHandler}
      onFocus={inputOnFocusHandler}
    />
  };

  const numberInput = (key, value, index, onBlurHandler) => {
    const newValue = value === 0 ? "" : value;
    return textInput(key, newValue, index, onBlurHandler, "number");
  };

  return {
    toggleEditMode,
    editMode,
    toggleAddNewMode,
    addNewMode,
    inputOnFocusHandler,
    editableDivOnFocusHandler,
    onKeyPressHandler,
    textAreaInput,
    numberInput,
    textInput,
  }
};

export default useTableLogic;