import React, { useState, useEffect } from 'react';
import styles from './CellInput.module.css';

export default React.memo(({ value, type, onBlurHandler, onClickHandler, onKeyPressHandler, styleClass }) => {

  const [newValue, setValue] = useState(value);

  const onChangeHandler = (event) => {
    const target = event.currentTarget;
    setValue(target.value);
  }

  // have to use useEffect since the useState
  // runs only once to init the data and when the
  // value updates the local state needs to be
  // updated as well because the input value is
  // not connected directly to the outside value
  useEffect(() => {
    setValue(value);
  }, [value])

  if (type === "textarea")
    return <textarea
      className={styleClass || styles.cellRender}
      value={newValue}
      onKeyPress={onKeyPressHandler}
      onBlur={onBlurHandler}
      onClick={onClickHandler}
      onChange={onChangeHandler}
    />;
  else
    return <input
      type={type}
      className={styleClass || styles.cellRender}
      value={newValue}
      onKeyPress={onKeyPressHandler}
      onBlur={onBlurHandler}
      onClick={onClickHandler}
      onChange={onChangeHandler}
    />;

},
  areEqual);

function areEqual(prevProps, nextProps) {
  if (prevProps.value === nextProps.value)
    return true;
  else return false;
}