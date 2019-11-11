import React, { useState } from 'react';
import { Select, Button, MenuItem } from '@material-ui/core';
import styles from './DatePicker.module.css';
import Spinner from '../Spinner/Spinner';

export default ({ months, quarters, years, date, submitHandler }) => {

  const [selectDate, setDate] = useState({
    ...date
  });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    const newValue = name === "year" || name === "quarter" ? Number.parseInt(value) : value;

    setDate({
      ...selectDate,
      [name]: newValue
    });
  }

  //if months data exist, render it
  const renderMonths = months && months.data.length > 0 ? <Select
    name="month"
    className={styles.formSelect}
    value={selectDate.month}
    onChange={onChangeHandler}
  >
    {months.data.map((month) => {
      return <MenuItem value={month.month} key={month.id}>{month.monthHeb}</MenuItem>;
    })}
  </Select> : null;

  //if quarters data exist, render it
  const renderQuarters = quarters && quarters.data.length > 0 ? <Select
    name="quarter"
    className={styles.formSelect}
    value={selectDate.quarter}
    onChange={onChangeHandler}
  >
    {quarters.data.map((quarter) => {
      return <MenuItem value={quarter.quarter} key={quarter.id}>{quarter.quarterHeb}</MenuItem>;
    })}
  </Select> : null;

  //if quarters data exist, render it
  const renderYears = years && years.data.length > 0 ? <Select
    name="year"
    className={styles.formSelect}
    value={selectDate.year}
    onChange={onChangeHandler}
  >
    {years.data.map((year) => {
      return <MenuItem value={year.year} key={year.id}>{year.year}</MenuItem>;
    })}
  </Select> : null;

  if ((months && months.isFetching) || (quarters && quarters.isFetching) || (years && years.isFetching)) {
    return <div className={styles.dates}><Spinner loadingText={"טוען מודל בחירת תאריכים..."} size={20} /></div>;
  } else {
    return (
      <div id="dates" className={styles.dates}>
        <form className={styles.formControl}>

          {renderMonths}
          {renderQuarters}
          {renderYears}

        </form>
        <Button variant="contained" color="secondary" className={styles.button} onClick={() => submitHandler(selectDate)}>
          טען
        </Button>
      </div>
    );
  }

}
