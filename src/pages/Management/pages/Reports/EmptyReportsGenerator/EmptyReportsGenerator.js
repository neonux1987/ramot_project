// LIBRARIES
import React, { useState } from 'react';
import { Select, Button, MenuItem } from '@material-ui/core';


// UTILS
import Helper from '../../../../../helpers/Helper';
import classnames from 'classnames';

// SERVICES
import { generateEmptyReports } from '../../../../../services/emptyReportsGenerator.svc';

//CSS
import {
  subtitle,
  paddingLeft,
  select,
  createBtn
} from './EmptyReportsGenerator.module.css';

// ACTIONS
import StyledExpandableSection from '../../../../../components/Section/StyledExpandableSection';
import { Description } from '@material-ui/icons';
import SubtitleBoldTypography from '../../../../../components/Typographies/SubtitleBoldTypography';

const years = generateYears(new Date().getFullYear());
const quarters = Helper.getYearQuarters();

export default () => {
  const date = new Date();//current date

  const [selectDate, setSelectDate] = useState({
    year: date.getFullYear(),
    month: date.getMonth(),
    quarter: Helper.getCurrentQuarter()
  });

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
      padding={"30px 20px 50px"}
    >

      <div className={subtitle}>
        <SubtitleBoldTypography>
          הפקת דוחות ריקים לכל הבניינים:
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
    </StyledExpandableSection>
  )
};

function generateYears(currentYear) {
  const arr = [];
  const backToYearLimit = currentYear - 5;
  for (let i = currentYear; i > backToYearLimit; i--)
    arr.push(i);

  return arr;
}