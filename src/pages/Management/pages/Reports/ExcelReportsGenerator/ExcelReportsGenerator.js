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
import {
  subtitle,
  paddingLeft,
  select,
  createBtn,
  description,
  descriptionText
} from './ExcelReportsGenerator.module.css';

// ACTIONS
import { fetchRegisteredReports } from '../../../../../redux/actions/registeredReportsActions';
import StyledExpandableSection from '../../../../../components/Section/StyledExpandableSection';
import { Description } from '@material-ui/icons';
import { exportToExcelBulk } from '../../../../../services/excel.svc';
import SubtitleBoldTypography from '../../../../../components/Typographies/SubtitleBoldTypography';

export default () => {
  const date = new Date();//current date

  const [selectDate, setSelectDate] = useState({
    year: date.getFullYear(),
    quarter: Helper.getCurrentQuarter(date.getMonth())
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
    const { year, quarter } = selectDate;

    const newDate = {
      year,
      quarter,
      quarterHeb: Helper.getQuarterHeb(quarter),
      quarterEng: Helper.convertQuarterToEng(quarter)
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

      <div className={subtitle}>

        <SubtitleBoldTypography>
          הפקת דוחות לכל הבניינים:
          </SubtitleBoldTypography>
      </div>

      <Select
        name="quarter"
        className={classnames(paddingLeft, select)}
        value={selectDate.quarter}
        onChange={onChangeHandler}
      >
        {quarters.map((quarter, index) => {
          return <MenuItem value={index + 1} key={index + 1}>{quarter}</MenuItem>;
        })}
      </Select>

      <Select
        name="year"
        className={classnames(paddingLeft, select)}
        value={selectDate.year}
        onChange={onChangeHandler}
      >
        {years.map((year, index) => {
          return <MenuItem value={year} key={index}>{year}</MenuItem>;
        })}
      </Select>

      <Button
        className={createBtn}
        onClick={onClickHandler}
        variant="contained"
        color="secondary">
        צור
      </Button>

      <div className={description}>

        <Typography className={descriptionText} variant="h6">
          המערכת תפיק דוחות לכל הבניינים ולכל הטבלאות. במידה וקיימים דוחות שכבר נוצרו לאותו רבעון,
    </Typography>
        <Typography className={descriptionText} variant="h6">
          המערכת תדרוס את הישנים ותייצר את החדשים במקום.
    </Typography>
      </div>


    </StyledExpandableSection>
  )
}