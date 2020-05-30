// LIBRARIES
import React, { useState, useEffect, Fragment } from 'react';
import { Button, MenuItem, Typography, Select, } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { RiFileExcel2Line } from 'react-icons/ri';

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
  descriptionText,
  error
} from './ExcelReportsGenerator.module.css';

// ACTIONS
import { fetchRegisteredReportsGroupedByYear, fetchRegisteredReportsByYear } from '../../../../../redux/actions/registeredReportsActions';

export default () => {
  const date = new Date();//current date

  const [year, setYear] = useState(date.getFullYear());
  const [quarter, setQuarter] = useState(Helper.getCurrentQuarter(date.getMonth()));

  const dispatch = useDispatch();

  const [quarters, setQuarters] = useState([]);
  const registeredReports = useSelector(store => store.registeredReports);
  console.log(year);
  useEffect(() => {
    dispatch(fetchRegisteredReportsGroupedByYear()).then((result) => {
      const yearsData = result.data;

      if (yearsData !== undefined) {
        const lastYear = yearsData[0].year;
        setYear(() => lastYear);

        dispatch(fetchRegisteredReportsByYear(lastYear)).then(({ data }) => {
          if (data.length > 0)
            setQuarters(() => {
              setQuarter(() => data[0].quarter);
              return data;
            });
        }); // end dispatch

      } // end if


    }); // end dispatch


  }, [dispatch]);



  const onYearChangeHandler = (event) => {
    const { value } = event.target;
    setYear(value);

    dispatch(fetchRegisteredReportsByYear(value)).then(({ data }) => {
      if (data.length > 0)
        setQuarters(() => {
          setQuarter(() => data[0].quarter);
          return data;
        });
    }); // end dispatch
  }

  const onQuarterChangeHandler = (event) => {
    const { value } = event.target;
    setQuarter(value);
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

      <div className={subtitle}>

        <SubtitleBoldTypography>
          הפקת דוחות לכל הבניינים:
  </SubtitleBoldTypography>
      </div>

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
          *לתשומת ליבך: המערכת תדרוס דוחות קודמים במידה וקיימים
    </Typography>
      </div>
    </Fragment>
  }

  const renderContent = registeredReports.data.length === 0 ?
    <span className={error}>לא קיימים דוחות בבסיס נתונים, ולכן לא ניתן לייצא לדוחות אקסל.</span>
    : content();

  return (
    <StyledExpandableSection
      title={"הפקת דוחות אקסל"}
      TitleIcon={() => <RiFileExcel2Line style={{ width: "24px", height: "24px" }} />}
      padding={"30px 20px 50px"}
      iconBoxBg={"rgb(22, 156, 144)"}
      loading={registeredReports.isFetching && registeredReports.data.length === 0}
    >

      {renderContent}

    </StyledExpandableSection>
  )
}