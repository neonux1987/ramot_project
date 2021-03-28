// LIBRARIES
import React, { Fragment } from 'react';
import { Button, MenuItem, Typography, Select, } from '@material-ui/core';

// UTILS
import classnames from 'classnames';

//CSS
import {
  selectsWrapper,
  paddingLeft,
  select,
  createBtn,
  description,
  descriptionText,
  error
} from './ExcelReportsGenerator.module.css';

const ExcelReportsGenerator = ({
  year,
  quarter,
  quarters,
  registeredReports,
  onClickHandler,
  onQuarterChangeHandler,
  onYearChangeHandler
}) => {

  const content = () => {
    return <Fragment>
      <div className={selectsWrapper}>
        <Select
          name="quarter"
          className={classnames(paddingLeft, select)}
          value={quarters.length === 0 ? "" : quarter}
          onChange={onQuarterChangeHandler}
        >
          {quarters.map((element) => {
            const { quarter } = element;
            return <MenuItem value={quarter} key={quarter}>{`רבעון ${quarter}`}</MenuItem>;
          })}
        </Select>

        <Select
          name="year"
          className={classnames(paddingLeft, select)}
          value={quarters.length === 0 ? "" : year}
          onChange={onYearChangeHandler}
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
      </div>

      <div className={description}>
        <Typography className={descriptionText} variant="h6">
          *לתשומת ליבך: המערכת תדרוס דוחות קודמים במידה וקיימים
    </Typography>
      </div>
    </Fragment>
  }

  const renderContent = registeredReports.data.length === 0 ?
    <span className={error}>לא קיימים דוחות בבסיס נתונים ולכן לא ניתן להפיק דוחות אקסל.</span>
    : content();

  return (
    <div>
      {renderContent}
    </div>
  )
}

export default ExcelReportsGenerator;