import React, { useState } from 'react';
import { Select, FormControl } from '@material-ui/core';
import { formControl, select } from './SelectDropDown.module.css';

const SelectDropDown = React.memo(({ targetValue, itemsArr, selectChangeHandler, index, name, item }) => {

  const onChangeHandler = (event) => {
    const target = event.target;
    selectChangeHandler(target.name, target.value, index);
  }

  const [menuItem, setMenuItem] = useState(item);

  const display = menuItem ? menuItem : itemsArr;

  return (
    <FormControl className={formControl}>
      <Select
        className={select}
        name={name}
        value={targetValue}
        onChange={onChangeHandler}
        onOpen={() => setMenuItem(null)}
      >
        {display}
      </Select>
    </FormControl>
  );

});

export default SelectDropDown;