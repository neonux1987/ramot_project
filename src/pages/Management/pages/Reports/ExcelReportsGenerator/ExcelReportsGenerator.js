// LIBRARIES
import React, { useState, useEffect } from 'react';
import { Select, Button, MenuItem, Typography, } from '@material-ui/core';
import { useDispatch, /* useSelector */ } from 'react-redux';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

// UTILS
import Helper from '../../../../../helpers/Helper';
import classnames from 'classnames';

// SERVICES


//CSS
import styles from './ExcelReportsGenerator.module.css';

// ACTIONS
import { fetchRegisteredReports } from '../../../../../redux/actions/registeredReportsActions';
import StyledExpandableSection from '../../../../../components/Section/StyledExpandableSection';
import { Description, Help } from '@material-ui/icons';
import { exportToExcelBulk } from '../../../../../services/excel.svc';

export default () => {
  const date = new Date();//current date

  const [selectDate, setSelectDate] = useState({
    year: date.getFullYear(),
    quarter: Helper.getCurrentQuarter(date.getMonth()),
    month: date.getMonth()
  });

  const [checkBox, setCheckBox] = useState({
    byMonth: false,
    byQuarter: true
  });

  const months = Helper.getMonths();
  const quarters = Helper.getYearQuarters();
  const years = [2018, 2019, 2020];

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchRegisteredReports());
  }, [dispatch]);

  //const registeredReports = useSelector(store => store.registeredReports)

  // default on change handler
  // for months and quarters
  const onChangeHandler = (event) => {
    const { name, value } = event.target;

    setSelectDate({
      ...selectDate,
      [name]: Number.parseInt(value)
    });
  }

  const checkBoxHandler = (event) => {
    const { name, checked } = event.target;

    if (checked && name === "byQuarter")
      setCheckBox({
        byMonth: false,
        byQuarter: true
      });
    else if (checked && name === "byMonth")
      setCheckBox({
        byMonth: true,
        byQuarter: false
      });
  }

  const onClickHandler = () => {
    const { year, quarter, month } = selectDate;

    const newDate = {
      year,
      quarter,
      quarterHeb: Helper.getQuarterHeb(quarter),
      quarterEng: Helper.convertQuarterToEng(quarter)
    }

    if (checkBox.byMonth)
      newDate = {
        month,
        monthHeb: Helper.getCurrentMonthHeb(month),
        monthEng: Helper.getCurrentMonth(month)
      }

    exportToExcelBulk(newDate);
  }

  return (
    <StyledExpandableSection
      title={"הפקת דוחות אקסל"}
      TitleIcon={Description}
      iconBoxBg={"#1b966e"}
      padding={"40px 20px"}
    >

      <div style={{ paddingBottom: "10px", fontSize: "28px" }}>
        <Typography className={styles.description} variant="h6">
          במידה ומחולל הדוחות האוטומטי לא עובד, באפשרותך ליצור דוחות ריקים חדשים באמצעות
          מחולל זה לפי התאריכים שתבחר.
    </Typography>
      </div>

      <FormGroup row>
        <FormControlLabel
          control={
            <Checkbox
              checked={checkBox.byMonth}
              onChange={checkBoxHandler}
              name="byMonth"
              color="primary"
            />
          }
          label="לפי חודש"
        />

        <FormControlLabel
          control={
            <Checkbox
              checked={checkBox.byQuarter}
              onChange={checkBoxHandler}
              name="byQuarter"
              color="primary"
            />
          }
          label="לפי רבעון"
        />

      </FormGroup>

      <Select
        name="month"
        className={classnames(styles.paddingLeft, styles.select)}
        value={selectDate.month}
        onChange={onChangeHandler}
        disabled={!checkBox.byMonth}
      >
        {months.map((month, index) => {
          return <MenuItem value={index + 1} key={index + 1}>{month}</MenuItem>;
        })}
      </Select>

      <Select
        name="quarter"
        className={classnames(styles.paddingLeft, styles.select)}
        value={selectDate.quarter}
        onChange={onChangeHandler}
        disabled={!checkBox.byQuarter}
      >
        {quarters.map((quarter, index) => {
          return <MenuItem value={index + 1} key={index + 1}>{quarter}</MenuItem>;
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
    </StyledExpandableSection>
  )
}