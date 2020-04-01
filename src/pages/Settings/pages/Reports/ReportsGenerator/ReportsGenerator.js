// LIBRARIES
import React, { useState, useEffect } from 'react';
import { Select, Button, MenuItem, Typography, Divider } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';

// UTILS
import Helper from '../../../../../helpers/Helper';
import classnames from 'classnames';

// SERVICES
import { generateEmptyReports } from '../../../../../services/reportsGenerator.svc';

//CSS
import styles from './ReportsGenerator.module.css';

// ACTIONS
import { fetchRegisteredReports } from '../../../../../redux/actions/registeredReportsActions';

export default props => {
  const date = new Date();//current date

  const [selectDate, setSelectDate] = useState({
    year: date.getFullYear(),
    month: date.getMonth()
  });

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchRegisteredReports());
  }, []);

  const registeredReports = useSelector(store => store.registeredReports)

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

  const onClickHandler = () => {
    const newDate = {
      month: Helper.getCurrentMonth(selectDate.month),
      monthHeb: Helper.getCurrentMonthHeb(selectDate.month),
      monthNum: selectDate.month,
      year: selectDate.year,
      quarter: Helper.getCurrentQuarter(selectDate.month),
      quarterHeb: Helper.getCurrentQuarterHeb(selectDate.month),
      quarterEng: Helper.convertMonthNumToQuarterEng(selectDate.month)
    }
    generateEmptyReports(newDate);
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
        return <MenuItem value={index} key={index}>{month}</MenuItem>;
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
      onClick={onClickHandler}
      variant="contained"
      color="secondary">
      צור
      </Button>
  </div>)
}