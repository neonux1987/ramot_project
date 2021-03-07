// LIBRARIES
import React from 'react';
import { Select, Button, MenuItem } from '@material-ui/core';

// COMPONENTS
import SubtitleBoldTypography from '../../../../../components/Typographies/SubtitleBoldTypography';

// UTILS
import classnames from 'classnames';

//CSS
import {
  subtitle,
  paddingLeft,
  select,
  createBtn,
  container
} from './EmptyReportsGenerator.module.css';


const EmptyReportsGenerator = ({ selectDate, onChangeHandler, onClickHandler, years, quarters }) => {
  return (
    <div className={container}>

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
    </div>
  )
};

export default EmptyReportsGenerator;