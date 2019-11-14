import React from 'react';
import styles from './TableCell.module.css';

export const NumberInput = React.memo(({ defaultValue, onBlurHandler, onClickHandler, onKeyPressHandler }) => {
  return <input
    type="number"
    className={styles.cellRender}
    defaultValue={defaultValue}
    onKeyPress={onKeyPressHandler}
    onBlur={onBlurHandler}
    onClick={onClickHandler}
  />;
}, areEqual);

export const TextAreaInput = React.memo(({ defaultValue, onBlurHandler, onClickHandler, onKeyPressHandler }) => {
  return <textarea
    className={styles.cellRender}
    defaultValue={defaultValue}
    onKeyPress={onKeyPressHandler}
    onBlur={onBlurHandler}
    onClick={onClickHandler}
  />;
}, areEqual);

export const TextInput = React.memo(({ defaultValue, onBlurHandler, onClickHandler, onKeyPressHandler }) => {
  return <input
    type="text"
    className={styles.cellRender}
    defaultValue={defaultValue}
    onKeyPress={onKeyPressHandler}
    onBlur={onBlurHandler}
    onClick={onClickHandler}
  />;
}, areEqual);

export const DefaultCell = React.memo((defaultValue) => {
  return <span>{defaultValue}</span>;
}, areEqual);

function areEqual(prevProps, nextProps) {
  if (prevProps.defaultValue === nextProps.defaultValue)
    return true;
  else return false;
}