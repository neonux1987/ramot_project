import React, { useState } from 'react';
import { Select, Button, MenuItem, Typography, Divider } from '@material-ui/core';
import Helper from '../../../../../helpers/Helper';
import styles from './ReportsGenerator.module.css';
import classnames from 'classnames';

export default props => {
  const [selectDate, setSelectDate] = useState({
    year: 2020,
    month: "מרץ"
  });

  // default on change handler
  // for months and quarters
  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    const newValue = name === "year" ? Number.parseInt(value) : value;

    setSelectDate({
      ...selectDate,
      [name]: newValue
    });
  }

  const months = Helper.getMonths();
  const years = [2018, 2019, 2020];

  return (<div>
    <div style={{ paddingBottom: "0px", fontSize: "28px" }}>
      <Typography variant="h5">
        מחולל דוחות
    </Typography>
    </div>

    <Divider className={styles.divider} />

    <div style={{ paddingBottom: "10px", fontSize: "28px" }}>
      <Typography className={styles.description} variant="h6">
        במידה ומחולל הדוחות האוטומטי לא עובד, באפשרותך ליצור דוחות ריקים חדשים באמצעות
        מחולל זה לפי התאריכים שתבחר.
    </Typography>
    </div>

    <Select
      name="month"
      className={classnames(styles.paddingLeft, styles.select)}
      value={selectDate.month}
      onChange={onChangeHandler}
    >
      {months.map((month, index) => {
        return <MenuItem value={month} key={index}>{month}</MenuItem>;
      })}
    </Select>

    <Select
      name="year"
      className={classnames(styles.paddingLeft, styles.select)}
      value={selectDate.year}
      onChange={onChangeHandler}
    >
      {years.map((year, index) => {
        return <MenuItem value={year} key={index}>{year}</MenuItem>;
      })}
    </Select>

    <Button
      className={styles.createBtn}
      onClick={props.toggleDbBackupActivation}
      variant="contained"
      color="secondary">
      צור
      </Button>
  </div>)
}