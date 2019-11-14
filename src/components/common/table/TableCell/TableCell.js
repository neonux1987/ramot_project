import React from 'react';
import styles from './TableCell.module.css';

export default React.memo(({ defaultValue, type, onBlurHandler, onClickHandler, onKeyPressHandler }) => {

  if (type === "textarea") {
    return <textarea
      className={styles.cellRender}
      defaultValue={defaultValue}
      onKeyPress={onKeyPressHandler}
      onBlur={onBlurHandler}
      onClick={onClickHandler}
    />;
  }
  else if(type==="default"){
    return <span>{defaultValue}</span>;
  }
  else {
    return <input
      type={type}
      className={styles.cellRender}
      defaultValue={defaultValue}
      onKeyPress={onKeyPressHandler}
      onBlur={onBlurHandler}
      onClick={onClickHandler}
    />;
  }

},
  areEqual);

function areEqual(prevProps, nextProps) {
  if (prevProps.defaultValue === nextProps.defaultValue)
    return true;
  else return false;
}