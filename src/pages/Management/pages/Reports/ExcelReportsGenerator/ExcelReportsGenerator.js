// LIBRARIES
import React, { useState, useEffect, Fragment } from 'react';
import { Button, MenuItem, Typography, Select, } from '@material-ui/core';
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
import SelectWithLoading from '../../../../../components/SelectWithLoading/SelectWithLoading';

//CSS
import {
  subtitle,
  paddingLeft,
  select,
  createBtn,
  description,
  descriptionText,
  error
} from './ExcelReportsGenerator.module.css';

// ACTIONS
import { fetchRegisteredReportsGroupedByYear, fetchRegisteredReportsByYear } from '../../../../../redux/actions/registeredReportsActions';

export default () => {
  const date = new Date();//current date

  const [year, setYear] = useState(date.getFullYear());
  const [quarter, setQuarter] = useState(Helper.getCurrentQuarter(date.getMonth()));

  const [quarters, setQuarters] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchRegisteredReportsGroupedByYear());

    dispatch(fetchRegisteredReportsByYear(year)).then(({ data }) => {
      if (data.length > 0)
        setQuarters(() => {
          setQuarter(() => data[0].quarter);
          return data;
        });
    });
  }, [dispatch, year]);

  const registeredReports = useSelector(store => store.registeredReports);

  const onYearChangeHandler = (event) => {
    const { value } = event.target;
    setYear(Number.parseInt(value));
  }

  const onQuarterChangeHandler = (event) => {
    const { value } = event.target;
    setQuarter(Number.parseInt(value));
  }

  const onClickHandler = () => {
    const newDate = {
      year,
      quarter,
      quarterHeb: Helper.getQuarterHeb(quarter),
      quarterEng: Helper.convertQuarterToEng(quarter)
    }

    exportToExcelBulk(newDate);
  }

  const content = () => {
    return <Fragment>
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

      <div className={description}>

        <Typography className={descriptionText} variant="h6">
          המערכת תפיק דוחות לכל הבניינים ולכל הטבלאות. במידה וקיימים דוחות שכבר נוצרו לאותו רבעון,
    </Typography>
        <Typography className={descriptionText} variant="h6">
          המערכת תדרוס את הישנים ותייצר את החדשים במקום.
    </Typography>
      </div>
    </Fragment>
  }

  const renderContent = registeredReports.data.length === 0 ?
    <span className={error}>לא קיימים דוחות בבסיס נתונים, לא ניתן לייצא דוחות אקסל.</span>
    : content();

  return (
    <StyledExpandableSection
      title={"הפקת דוחות אקסל"}
      TitleIcon={Description}
      iconBoxBg={"#1b966e"}
      padding={"30px 20px 50px"}
      loading={registeredReports.isFetching && registeredReports.data.length === 0}
    >

      <div className={subtitle}>

        <SubtitleBoldTypography>
          הפקת דוחות לכל הבניינים:
          </SubtitleBoldTypography>
      </div>

      {renderContent}

    </StyledExpandableSection>
  )
}