import React from "react";
import CheckboxWithLabel from "../../../../../../components/Checkboxes/CheckboxWithLabel";

const ResetDB = ({ byReset, onCheckBoxChangeHandler }) => (
  <CheckboxWithLabel
    label="איפוס בסיס הנתונים"
    checked={byReset}
    onChange={onCheckBoxChangeHandler}
    name="byReset"
  />
);

export default ResetDB;
