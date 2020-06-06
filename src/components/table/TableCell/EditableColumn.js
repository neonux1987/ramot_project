import React, { useState, useEffect } from 'react';
import styles from './EditableColumn.module.css';
import { css } from 'emotion';
import { Edit } from '@material-ui/icons';

const iconWrapper = css`
  position: absolute;
  top: 5px;
  right: 2px;
`;

const icon = css`
  color: #5a5c65;
`;

export default React.memo(({ value, type, onBlurHandler, onKeyPressHandler, onFocusHandler, styleClass, style, dataKey, dataIndex, showIcon = false }) => {

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

  return <div className={styles.wrapper}>
    {showIcon ? <div className={iconWrapper}>
      <Edit className={icon} />
    </div> : null}
    {renderer}
  </div>;

});