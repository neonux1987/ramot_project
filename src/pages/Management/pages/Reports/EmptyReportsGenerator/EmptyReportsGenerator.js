// LIBRARIES
import React, { useState, useEffect } from 'react';
import { Select, Button, MenuItem, Typography } from '@material-ui/core';
import { useDispatch, /* useSelector */ } from 'react-redux';


// UTILS
import Helper from '../../../../../helpers/Helper';
import classnames from 'classnames';

// SERVICES
import { generateEmptyReports } from '../../../../../services/emptyReportsGenerator.svc';

//CSS
import styles from './EmptyReportsGenerator.module.css';

// ACTIONS
import { fetchRegisteredReports } from '../../../../../redux/actions/registeredReportsActions';
import StyledExpandableSection from '../../../../../components/Section/StyledExpandableSection';
import { Description } from '@material-ui/icons';

export default props => {
  const date = new Date();//current date

  const [selectDate, setSelectDate] = useState({
    year: date.getFullYear(),
    month: date.getMonth(),
    quarter: Helper.getCurrentQuarter()
  });

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

  const onClickHandler = () => {
    const newDate = {
      year: selectDate.year,
      quarter: selectDate.quarter,
      quarterHeb: Helper.getQuarterHeb(selectDate.quarter),
      quarterEng: Helper.convertQuarterToEng(selectDate.quarter)
    }
    generateEmptyReports(newDate);
  }

  return (
    <StyledExpandableSection
      title={"הפקת דוחות חדשים (ריקים)"}
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

      <Select
        name="quarter"
        className={classnames(styles.paddingLeft, styles.select)}
        value={selectDate.quarter}
        onChange={onChangeHandler}
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