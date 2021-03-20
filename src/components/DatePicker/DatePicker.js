import React, { useState, useCallback } from 'react';
import { MenuItem } from '@material-ui/core';
import Select from '../Select/Select';
import FormWrapper from '../FormWrapper/FormWrapper';

const DatePicker = ({
  quarter = false,
  month = false,
  date,
  monthsList = [],
  quartersList = [],
  yearsList = [],
  onChange,
  yearsFetching = false,
  quartersFetching = false,
  monthsFetching = false
}) => {

  const [selectDate, setDate] = useState({
    year: date.year,
    quarter: date.quarter,
    month: date.month
  });

  const internalOnChange = useCallback((event) => {
    const { value, name } = event.target;
    const newValue = name === "year" ? Number.parseInt(value) : value;

    if (name === "year")
      setDate(() => ({
        year: newValue,
        quarter: "",
        month: ""
      }));
    else
      setDate(prevSelectDate => ({
        ...prevSelectDate,
        [name]: newValue
      }));

    onChange(name, newValue);
  }, [onChange]);

  //if months data exist, render it
  const renderMonths = () => month && <Select
    name="month"
    label={"חודש:"}
    value={monthsList.length === 0 ? "" : selectDate.month}
    onChange={internalOnChange}
    disabled={monthsList.length === 0 ? true : false}
    displayEmpty
    emptyLabel={"בחר חודש"}
    loading={monthsFetching}
  >
    {monthsList.map((month) => {
      return <MenuItem value={month.month} key={month.id}>{month.monthHeb}</MenuItem>;
    })}
  </Select>;

  //if quarters data exist, render it
  const renderQuarters = () => quarter && <Select
    name="quarter"
    label={"רבעון:"}
    value={quartersList.length === 0 ? "" : selectDate.quarter}
    onChange={internalOnChange}
    disabled={quartersList.length === 0 ? true : false}
    displayEmpty
    emptyLabel={"בחר רבעון"}
    loading={quartersFetching}
  >
    {quartersList.map((quarter) => {
      return <MenuItem value={quarter.quarter} key={quarter.id}>{quarter.quarterHeb}</MenuItem>;
    })}
  </Select>;

  //if years data exist, render it
  const renderYears = <Select
    name="year"
    label={"שנה:"}
    value={yearsList.length === 0 ? "" : selectDate.year}
    onChange={internalOnChange}
    displayEmpty
    emptyLabel={"בחר שנה"}
    loading={yearsFetching}
  >
    {yearsList.map((year) => {
      return <MenuItem value={year.year} key={year.id}>{year.year}</MenuItem>;
    })}
  </Select>;

  return <FormWrapper>
    {renderYears}
    {quarter && renderQuarters()}
    {month && renderMonths()}
  </FormWrapper>;

}

export default React.memo(DatePicker);