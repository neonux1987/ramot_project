import React, { useState, useEffect } from 'react';
import styles from './CellInput.module.css';
import classnames from 'classnames';

export default React.memo(({ value, type, onBlurHandler, onClickHandler, onKeyPressHandler, styleClass, style }) => {

  const [newValue, setValue] = useState(value);

  const onChangeHandler = (event) => {
    const target = event.currentTarget;
    setValue(target.value);
  }

  // have to use useEffect since the useState
  // runs only once to init the data and when the
  // value updates the local state needs to be
  // updated as well because the input value is
  // not connected directly to the outside state
  useEffect(() => {
    setValue(value);
  }, [value]);

  let renderer = null;

  if (type === "textarea")
    renderer = <textarea
      className={styleClass || styles.cellRender}
      style={style}
      value={newValue}
      onKeyPress={onKeyPressHandler}
      onBlur={onBlurHandler}
      onClick={onClickHandler}
      onChange={onChangeHandler}
    />;
  else
    renderer = <input
      type={type}
      className={styleClass || styles.cellRender}
      value={newValue}
      style={style}
      onKeyPress={onKeyPressHandler}
      onBlur={onBlurHandler}
      onClick={onClickHandler}
      onChange={onChangeHandler}
    />;

  return <div className={styles.wrapper}>{renderer}</div>;

},
  areEqual);

function areEqual(prevProps, nextProps) {
  if (prevProps.value === nextProps.value)
    return true;
  else return false;
}