import React from 'react';
import { Select, FormControl } from '@material-ui/core';
import { formControl, select } from './SelectDropDown.module.css';

const SelectDropDown = React.memo(({ targetValue, itemsArr, selectChangeHandler, index, name }) => {

  const onChangeHandler = (event) => {
    const target = event.target;
    selectChangeHandler(target.name, target.value, index);
  }

  return (
    <FormControl className={formControl}>
      <Select
        className={select}
        name={name}
        value={targetValue}
        renderValue={(value) => value}
        onChange={onChangeHandler}
      >
        {itemsArr}
      </Select>
    </FormControl>
  );

});

export default SelectDropDown;