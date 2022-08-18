import React from "react";
import RadioWithLabel from "../../../../../../components/Radio/RadioWithLabel";

const ResetDB = ({ byReset, onCheckBoxChangeHandler }) => (
  <RadioWithLabel
    label="איפוס בסיס הנתונים"
    checked={byReset}
    onChange={onCheckBoxChangeHandler}
    name="byReset"
  />
);

export default ResetDB;
