import React, { useState, useCallback } from 'react';
import { MenuItem } from '@material-ui/core';
import Select from '../Select/Select';
import FormWrapper from '../FormWrapper/FormWrapper';

const DatePickerV2 = ({
  quarter = false,
  month = false,
  date,
  monthsList = [],
  quartersList = [],
  yearsList = [],
  onChange
}) => {

  const [selectDate, setDate] = useState({
    year: date.year,
    quarter: date.quarter,
    month: date.month
  });

  const internalOnChange = useCallback((event) => {
    const { value, name } = event.target;
    const newValue = name === "year" ? Number.parseInt(value) : value;

    setDate({
      ...selectDate,
      [name]: newValue
    });

    onChange(name, newValue);
  }, [onChange]);

  const yearExist = () => {
    let exist = false;
    yearsList.forEach((item) => {
      if (selectDate.year === item.year)
        exist = true;
    });
    return exist;
  }

  const monthExist = () => {
    let exist = false;
    monthsList.forEach((item) => {
      if (selectDate.month === item.month)
        exist = true;
    });
    return exist;
  }

  const quarterExist = () => {
    let exist = false;
    quartersList.forEach((item) => {
      if (selectDate.quarter === item.quarter)
        exist = true;
    });
    return exist;
  }

  //if months data exist, render it
  const renderMonths = () => month && <Select
    name="month"
    label={"חודש:"}
    value={""}
    onChange={internalOnChange}
    disabled={monthsList.length === 0 ? true : false}
    displayEmpt={true}
  >
    {selectDate.month === "" || monthExist() === false ? <MenuItem value={""}>בחר חודש</MenuItem> : null}
    {monthsList.length > 0 && monthsList.map((month) => {
      return <MenuItem value={month.month} key={month.id}>{month.monthHeb}</MenuItem>;
    })}
  </Select>;

  //if quarters data exist, render it
  const renderQuarters = () => quarter && <Select
    name="quarter"
    label={"רבעון:"}
    value={selectDate.quarter}
    onChange={internalOnChange}
    disabled={quartersList.length === 0 ? true : false}
    loading={quarter === undefined}
  >
    {quartersList.length === 0 ? <MenuItem value={""}>אין</MenuItem> : null}
    {quartersList.map((quarter) => {
      return <MenuItem value={quarter.quarter} key={quarter.id}>{quarter.quarterHeb}</MenuItem>;
    })}
  </Select>;

  //if years data exist, render it
  const renderYears = <Select
    name="year"
    label={"שנה:"}
    value={selectDate.year}
    onChange={internalOnChange}
  >
    {yearsList.length === 0
      ? <MenuItem value={selectDate.year}>בחר שנה</MenuItem> : null}
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

export default React.memo(DatePickerV2);