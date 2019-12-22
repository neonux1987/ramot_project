import React, { useCallback } from 'react';
import { Select, FormControl, InputLabel, MenuItem } from '@material-ui/core';
import styles from './SelectDropDown.module.css';

const SelectDropDown = React.memo(({ targetValue, itemsArr, selectChangeHandler, rowNumber }) => {

  const onChangeHandler = (event) => {
    const target = event.target;
    selectChangeHandler(target.name, target.value, rowNumber);
  }

  return (
    <FormControl className={styles.formControl}>
      <Select
        name="summarized_section_id"
        value={targetValue}
        onChange={onChangeHandler}
      >
        {itemsArr}
      </Select>
    </FormControl>
  );

}, areEqual);

function areEqual(prevProps, nextProps) {
  if (prevProps.targetValue === nextProps.targetValue)
    return true;
  else return false;
}

export default SelectDropDown;