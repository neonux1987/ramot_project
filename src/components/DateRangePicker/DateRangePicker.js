import React, { useEffect, useState } from 'react';
import { MenuItem } from '@material-ui/core';
import Select from '../Select/Select';
import FormWrapper from '../FormWrapper/FormWrapper';
import WhiteButton from '../buttons/WhiteButton';

const DateRangePicker = ({ years = [], date, submit, loading = false }) => {

  const [selectDate, setDate] = useState({
    fromYear: date.fromYear,
    toYear: date.toYear
  });

  const onChange = (event) => {
    const { value, name } = event.target;
    const newValue = Number.parseInt(value);

    setDate({
      ...selectDate,
      [name]: newValue
    });
  }

  const list = () => {
    return years.map(({ year }) => {
      return <MenuItem key={year} value={year}>{year}</MenuItem>
    });
  }

  const onClickHandler = () => {
    submit(selectDate);
  }


  return <FormWrapper>
    <Select
      name="fromYear"
      label="מ-"
      value={selectDate.fromYear}
      onChange={onChange}
      loading={loading}
      displayEmpty
      emptyLabel={"בחר שנה"}
    >
      {list()}
    </Select>
    <Select
      name="toYear"
      label="עד-"
      value={selectDate.toYear}
      onChange={onChange}
      loading={loading}
      displayEmpty
      emptyLabel={"בחר שנה"}
    >
      {list()}
    </Select>
    <WhiteButton onClick={onClickHandler}>טען</WhiteButton>
  </FormWrapper>;

}

export default React.memo(DateRangePicker);