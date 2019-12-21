import React, { useState, useEffect } from 'react';
import styles from './EditableColumn.module.css';

export default React.memo(({ value, type, onBlurHandler, onKeyPressHandler, onFocusHandler, styleClass, style, dataKey, dataIndex }) => {

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
    renderer = <div
      contentEditable
      className={styleClass || styles.textArea}
      style={style}
      suppressContentEditableWarning
      onKeyPress={onKeyPressHandler}
      onBlur={onBlurHandler}
      onFocus={onFocusHandler}
      onChange={onChangeHandler}
      dangerouslySetInnerHTML={{
        __html: newValue
      }}
      data-key={dataKey}
      data-index={dataIndex}
    />
  else
    renderer = <input
      type={type}
      className={styleClass || styles.cellRender}
      value={newValue}
      style={style}
      onKeyPress={onKeyPressHandler}
      onBlur={onBlurHandler}
      onFocus={onFocusHandler}
      onChange={onChangeHandler}
      data-key={dataKey}
      data-index={dataIndex}
    />;

  return <div className={styles.wrapper}>{renderer}</div>;

},
  areEqual);

function areEqual(prevProps, nextProps) {
  if (prevProps.value === nextProps.value)
    return true;
  else return false;
}