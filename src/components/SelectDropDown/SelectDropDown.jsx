import React, { useState, memo } from "react";
import { Select, FormControl } from "@material-ui/core";
import { formControl, select, dummy, icon } from "./SelectDropDown.module.css";
import ArrowDropDownIcon from "../Icons/ArrowDropDownIcon";

const SelectDropDown = React.memo(
  ({ value, valueName, selectChangeHandler, index, name, children }) => {
    const onChangeHandler = (event) => {
      const target = event.target;
      selectChangeHandler(target.name, target.value, index);
    };

    const [showDummy, setDummy] = useState(true);

    // in order to optimise performance if multiple selects components
    // displayed we use a fake dummy for presentatation, only when the dummy is
    // clicked it displays the real select list
    const display = showDummy ? (
      <button className={dummy} onClick={() => setDummy(false)}>
        <ArrowDropDownIcon className={icon} />
        {valueName}
      </button>
    ) : (
      <Select
        className={select}
        name={name}
        value={value}
        onChange={onChangeHandler}
        onClose={() => setDummy(true)}
        open={!showDummy} // use the same state to save up on creating a separate state
        MenuProps={{
          variant: "menu",
          autoFocus: false,
          getContentAnchorEl: () => null
        }}
      >
        {children}
      </Select>
    );

    return <FormControl className={formControl}>{display}</FormControl>;
  }
);

export default memo(SelectDropDown);
