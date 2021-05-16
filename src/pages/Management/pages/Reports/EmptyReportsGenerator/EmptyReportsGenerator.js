// LIBRARIES
import React, { Fragment } from 'react';
import { Select, MenuItem, Typography } from '@material-ui/core';

// UTILS
import classnames from 'classnames';

//CSS
import {
  paddingLeft,
  select,
  container,
  description,
  descriptionText
} from './EmptyReportsGenerator.module.css';

// COMPONENTS
import WhiteButton from '../../../../../components/buttons/WhiteButton';

const EmptyReportsGenerator = ({ selectDate, onChangeHandler, onClickHandler, years, quarters }) => {
  return <Fragment>
    <div className={container}>

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

      <WhiteButton onClick={onClickHandler}>
        צור
      </WhiteButton>
    </div>

    <div className={description}>
      <Typography className={descriptionText} variant="h6">
        *לתשומת ליבך: המערכת יוצרת דוחות רבעוניים ריקים לכלל הבניינים הפעילים
    </Typography>
    </div>
  </Fragment>
};

export default EmptyReportsGenerator;