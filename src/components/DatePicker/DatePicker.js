import React, { useState, useEffect } from 'react';
import { Select, MenuItem, InputLabel } from '@material-ui/core';
import { pickerWrapper, pickerLabel, formSelect, formControl, dates, select } from './DatePicker.module.css';
import Spinner from '../Spinner/Spinner';
import { useSelector, useDispatch } from 'react-redux';
import * as registeredMonthsActions from '../../redux/actions/registeredMonthsActions';
import * as registeredQuartersActions from '../../redux/actions/registeredQuartersActions';
import * as registeredYearsActions from '../../redux/actions/registeredYearsActions';
import { updateDate } from '../../redux/actions/dateActions';
import Helper from '../../helpers/Helper';

const DatePicker = ({
  quarter = false,
  month = false,
  date,
  buildingName,
  pageName
}) => {

  const [selectDate, setDate] = useState({
    year: date.year,
    quarter: date.quarter,
    month: date.month
  });

  const dispatch = useDispatch();

  const months = useSelector(store => month ? store.registeredMonths.pages[pageName][buildingName] : undefined);
  const quarters = useSelector(store => quarter ? store.registeredQuarters.pages[pageName][buildingName] : undefined);
  const years = useSelector(store => store.registeredYears.pages[pageName][buildingName]);

  useEffect(() => {
    if (years.data.length === 0)
      dispatch(registeredYearsActions.fetchRegisteredYears({ pageName, buildingName })).then((result) => {

        const yearsData = result.data;

        if (yearsData.length !== 0) {
          const lastYear = yearsData[yearsData.length - 1].year;
          const currentDate = Helper.getCurrentDate();

          if (month)
            dispatch(registeredMonthsActions.fetchRegisteredMonths({
              pageName,
              buildingName,
              date: {
                year: lastYear
              }
            }))
              .then((result) => {
                const monthsData = result.data;
                const lastMonth = monthsData[monthsData.length - 1].month;

                const exist = monthsData.find((element) => {
                  return element.month === currentDate.month;
                });

                setDate(prevState => ({
                  ...prevState,
                  month: exist ? exist.month : lastMonth,
                  year: lastYear
                }));

                const newDate = Helper.generateAllDateByMonthName(exist ? exist.month : lastMonth);

                newDate.year = lastYear;
                dispatch(updateDate(pageName, buildingName, newDate));

              });

          if (quarter)
            dispatch(registeredQuartersActions.fetchRegisteredQuarters({
              pageName,
              buildingName,
              date: {
                year: lastYear
              }
            }))
              .then((result) => {
                const quartersData = result.data;
                const lastQuarter = quartersData[quartersData.length - 1].quarter;

                const exist = quartersData.find((element) => {
                  return element.quarter === currentDate.quarter;
                });

                setDate(prevState => ({
                  ...prevState,
                  quarter: exist ? exist.quarter : lastQuarter,
                  year: lastYear
                }));

                const newDate = {
                  quarter: lastQuarter,
                  quarterEng: Helper.convertQuarterToEng(exist ? exist.quarter : lastQuarter),
                  quarterHeb: Helper.getQuarterHeb(lastQuarter),
                  year: lastYear
                }
                dispatch(updateDate(pageName, buildingName, newDate));

              });

          if (!month && !quarter)
            dispatch(updateDate(pageName, buildingName, {
              year: date.year
            }));
        }

      });

  }, [month, quarter, dispatch, buildingName, pageName, years.data.length, date.year]);

  /*   useEffect(() => {
      dispatch(updateDate(pageName, buildingName, selectDate));
    }, [selectDate, pageName, buildingName, dispatch]); */


  const onMonthChange = (event) => {
    const { value } = event.target;

    setDate({
      ...selectDate,
      month: value
    });

    const newDate = Helper.generateAllDateByMonthName(value);
    newDate.year = selectDate.year;
    dispatch(updateDate(pageName, buildingName, newDate));
  }

  // default on change handler
  // for months and quarters
  const onQuarterChangeHandler = (event) => {
    const { value } = event.target;

    setDate({
      ...selectDate,
      quarter: value
    });

    const newDate = {
      quarter: value,
      quarterEng: Helper.convertQuarterToEng(value),
      quarterHeb: Helper.getQuarterHeb(value),
      year: selectDate.year
    }
    dispatch(updateDate(pageName, buildingName, newDate));
  }

  const onYearChangeHandler = (event) => {
    const { value } = event.target;
    const year = Number.parseInt(value);

    if (month) {
      dispatch((registeredMonthsActions.fetchRegisteredMonths({ pageName, buildingName, date: { year } }))).then((result) => {
        // get the earliest month in the list 
        const month = result.data[0].month;

        setDate({
          ...selectDate,
          month,
          year
        });

        const newDate = Helper.generateAllDateByMonthName(month);
        newDate.year = year;
        dispatch(updateDate(pageName, buildingName, newDate));

      });
    }

    if (quarter) {
      dispatch((registeredQuartersActions.fetchRegisteredQuarters({
        pageName,
        buildingName,
        date: {
          year
        }
      }))).then((result) => {
        // get the earliest quarter in the list
        const quarter = result.data[0].quarter;

        setDate({
          ...selectDate,
          year,
          quarter
        });

        const newDate = {
          quarter: quarter,
          quarterEng: Helper.convertQuarterToEng(quarter),
          quarterHeb: Helper.getQuarterHeb(quarter),
          year
        }
        dispatch(updateDate(pageName, buildingName, newDate));

      });
    }

    if (!month && !quarter) {
      setDate({
        ...selectDate,
        year
      });
    }

  }

  // the current year maybe will not be in the registered years 
  // yet because it wasn't created yet. so we must check to see
  // if the year exist in the registered years list, if not return 
  // empty string, otherwise the current year.
  const yearExist = () => {
    let exist = false;
    years.data.forEach((item) => {
      if (selectDate.year === item.year)
        exist = true;
    });
    return exist;
  }

  const monthExist = () => {
    let exist = false;
    months.data.forEach((item) => {
      if (selectDate.month === item.month)
        exist = true;
    });
    return exist;
  }

  const quarterExist = () => {
    let exist = false;
    quarters.data.forEach((item) => {
      if (selectDate.quarter === item.quarter)
        exist = true;
    });
    return exist;
  }

  //if months data exist, render it
  const renderMonths = months && !months.isFetching && months.data.length > 0 && monthExist() ?
    <div className={pickerWrapper}>
      <InputLabel className={pickerLabel} id="label">חודש:</InputLabel>
      <Select
        name="month"
        className={formSelect}
        value={selectDate.month || ""}
        onChange={onMonthChange}
      >
        {months.data.map((month) => {
          return <MenuItem value={month.month} key={month.id}>{month.monthHeb}</MenuItem>;
        })}
      </Select>
    </div>
    : <FormSelectDummy />;

  //if quarters data exist, render it
  const renderQuarters = quarters && !quarters.isFetching && quarters.data.length > 0 && quarterExist() ?
    <div className={pickerWrapper}>
      <InputLabel className={pickerLabel} id="label">רבעון:</InputLabel>
      <Select
        name="quarter"
        className={formSelect}
        value={selectDate.quarter || ""}
        onChange={onQuarterChangeHandler}
      >
        {quarters.data.map((quarter) => {
          return <MenuItem value={quarter.quarter} key={quarter.id}>{quarter.quarterHeb}</MenuItem>;
        })}
      </Select>
    </div>
    : <FormSelectDummy />;

  //if years data exist, render it
  const renderYears = !years.isFetching && years.data.length > 0 && yearExist() ?
    <div className={pickerWrapper}>
      <InputLabel className={pickerLabel} id="label">שנה:</InputLabel>
      <Select
        name="year"
        className={formSelect}
        value={selectDate.year || ""}
        onChange={onYearChangeHandler}
        classes={{ select }}
      >
        {years.data.map((year) => {
          return <MenuItem value={year.year} key={year.id}>{year.year}</MenuItem>;
        })}
      </Select>
    </div>
    : <FormSelectDummy />;

  return (
    <div id="dates" className={dates}>
      <form className={formControl}>
        {month && renderMonths}
        {quarter && renderQuarters}
        {renderYears}
      </form>
    </div>
  );

}

const FormSelectDummy = () => {
  return <div className={formSelect}>
    <Spinner size={18} />
  </div>
}

export default React.memo(DatePicker, (prevProps, nextProps) => {
  if (
    prevProps.year === nextProps.year &&
    prevProps.quarter === nextProps.quarter &&
    prevProps.month === nextProps.month &&
    prevProps.buildingName === nextProps.buildingName &&
    prevProps.pageName === nextProps.pageName &&
    prevProps.date === nextProps.date
  )
    return true;
});