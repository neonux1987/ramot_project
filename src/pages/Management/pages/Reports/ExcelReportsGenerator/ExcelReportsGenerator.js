// LIBRARIES
import React, { useState, useEffect } from 'react';
import { Select, Button, MenuItem, Typography, } from '@material-ui/core';
import { useDispatch, useSelector, /* useSelector */ } from 'react-redux';
import { Description } from '@material-ui/icons';

// UTILS
import Helper from '../../../../../helpers/Helper';
import classnames from 'classnames';

// SERVICES
import { exportToExcelBulk } from '../../../../../services/excel.svc';

// COMPONENTS
import StyledExpandableSection from '../../../../../components/Section/StyledExpandableSection';
import SubtitleBoldTypography from '../../../../../components/Typographies/SubtitleBoldTypography';

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
import { fetchRegisteredReportsGroupedByYear, fetchRegisteredReportsByYear } from '../../../../../redux/actions/registeredReportsActions';

export default () => {
  const date = new Date();//current date

  const [selectDate, setSelectDate] = useState({
    year: date.getFullYear(),
    quarter: Helper.getCurrentQuarter(date.getMonth())
  });

  const [quarters, setQuarters] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchRegisteredReportsGroupedByYear());

    dispatch(fetchRegisteredReportsByYear(selectDate.year)).then((result) => {
      setQuarters(result.data);
    });
  }, [dispatch, selectDate.year]);

  const registeredReports = useSelector(store => store.registeredReports);

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
        value={quarters.length === 0 ? "" : selectDate.quarter}
        onChange={onChangeHandler}
      >
        {quarters.map((element) => {
          const { quarter } = element;
          return <MenuItem value={quarter} key={quarter}>{`רבעון ${quarter}`}</MenuItem>;
        })}
      </Select>

      <Select
        name="year"
        className={classnames(paddingLeft, select)}
        value={quarters.length === 0 ? "" : selectDate.year}
        onChange={onChangeHandler}
      >
        {registeredReports.data.map((element, index) => {
          const { year } = element;
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