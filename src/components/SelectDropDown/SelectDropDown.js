import React, { useState, memo } from 'react';
import { Select, FormControl } from '@material-ui/core';
import { ArrowDropDown } from '@material-ui/icons';
import { formControl, select, dummy, icon } from './SelectDropDown.module.css';

const SelectDropDown = React.memo(({ value, valueName, selectChangeHandler, index, name, children }) => {

  const onChangeHandler = (event) => {
    const target = event.target;
    selectChangeHandler(target.name, target.value, index);
  }

  const [showDummy, setDummy] = useState(true);

  // in order to optimise performance if multiple selects components
  // displayed we use a fake dummy for presentatation, only when the dummy is
  // clicked it displays the real select list
  const display = showDummy ?
    <div
      className={dummy}
      onClick={() => setDummy(false)}>
      <ArrowDropDown className={icon} />
      {valueName}
    </div> :
    <Select
      className={select}
      name={name}
      value={value}
      onChange={onChangeHandler}
      onClose={() => setDummy(true)}
      open={!showDummy}// use the same state to save up on creating a separate state
      MenuProps={{
        variant: "menu",
        autoFocus: false,
        getContentAnchorEl: () => null
      }}
    >
      {children}
    </Select>;

  return (
    <FormControl className={formControl}>
      {display}
    </FormControl>
  );

});

export default memo(SelectDropDown);