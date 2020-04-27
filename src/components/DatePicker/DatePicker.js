import React, { useState, useEffect } from 'react';
import { Select, MenuItem, InputLabel } from '@material-ui/core';
import { pickerWrapper, pickerLabel, formSelect, formControl, dates, select } from './DatePicker.module.css';
import Spinner from '../Spinner/Spinner';
import { useSelector, useDispatch } from 'react-redux';
import registeredMonthsActions from '../../redux/actions/registeredMonthsActions';
import registeredQuartersActions from '../../redux/actions/registeredQuartersActions';
import registeredYearsActions from '../../redux/actions/registeredYearsActions';
import { updateDate } from '../../redux/actions/dateActions';
import Helper from '../../helpers/Helper';

const DatePicker = ({
  quarter = false,
  month = false,
  date,
  submitHandler,
  buildingName,
  pageName
}) => {

  const [selectDate, setDate] = useState({
    year: date.year,
    quarter: date.quarter,
    month: date.month
  });

  const dispatch = useDispatch();

  const months = useSelector(store => store.registeredMonths);
  const quarters = useSelector(store => store.registeredQuarters);
  const years = useSelector(store => store.registeredYears);

  useEffect(() => {
    dispatch((registeredYearsActions.fetchRegisteredYears({ buildingName }))).then(() => {
      if (month)
        dispatch((registeredMonthsActions.fetchRegisteredMonths({
          buildingName,
          date: {
            year: date.year
          }
        })));

      if (quarter)
        dispatch((registeredQuartersActions.fetchRegisteredQuarters({
          buildingName,
          date: {
            year: date.year
          }
        })));
    });

    // cleanup
    const cleanup = () => {
      dispatch((registeredYearsActions.cleanupYears(buildingName)))
      if (quarter)
        dispatch((registeredQuartersActions.cleanupQuarters(buildingName)))
      if (month)
        dispatch((registeredMonthsActions.cleanupMonths(buildingName)))
    }

    return cleanup;
  }, [month, quarter, dispatch, buildingName, date.year]);

  useEffect(() => {
    dispatch(updateDate(pageName, buildingName, selectDate));
  }, [selectDate]);


  const onMonthChange = (event) => {
    const { value } = event.target;

    const newDate = Helper.generateAllDateByMonthName(value);

    setDate({
      ...selectDate,
      ...newDate
    });
  }

  // default on change handler
  // for months and quarters
  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    const newValue = name === "year" || name === "quarter" ? Number.parseInt(value) : value;

    setDate({
      ...selectDate,
      [name]: newValue
    });
  }

  const onYearChangeHandler = (event) => {
    const { value } = event.target;
    const year = Number.parseInt(value);

    if (month) {
      dispatch((registeredMonthsActions.fetchRegisteredMonths({ buildingName, date: { year } }))).then((result) => {
        // get the earliest month in the list 
        const month = result[0].month;

        const newDate = Helper.generateAllDateByMonthName(month);

        setDate({
          ...selectDate,
          year,
          ...newDate
        });
      });
    }

    if (quarter) {
      dispatch((registeredQuartersActions.fetchRegisteredQuarters({
        buildingName,
        date: {
          year
        }
      }))).then((result) => {
        // get the earliest quarter in the list
        const quarter = result[0].quarter;
        const parsedQuarter = Number.parseInt(quarter);

        const newDate = {
          quarter: parsedQuarter,
          quarterEng: Helper.convertQuarterToEng(parsedQuarter),
          quarterHeb: Helper.getQuarterHeb(parsedQuarter)
        }

        setDate({
          ...selectDate,
          year,
          ...newDate
        });
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
      const parsedYear = Number.parseInt(item.year);
      if (selectDate.year === parsedYear)
        exist = true;
    });
    return exist;
  }

  //if months data exist, render it
  const renderMonths = !months.isFetching && months.data.length > 0 ?
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
  const renderQuarters = !quarters.isFetching && quarters.data.length > 0 ?
    <div className={pickerWrapper}>
      <InputLabel className={pickerLabel} id="label">רבעון:</InputLabel>
      <Select
        name="quarter"
        className={formSelect}
        value={selectDate.quarter || ""}
        onChange={onChangeHandler}
      >
        {quarters.data.map((quarter) => {
          return <MenuItem value={quarter.quarter} key={quarter.id}>{quarter.quarterHeb}</MenuItem>;
        })}
      </Select>
    </div>
    : <FormSelectDummy />;

  //if quarters data exist, render it
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
  if (prevProps.year === nextProps.year)
    return true;
  else if (prevProps.quarter === nextProps.quarter)
    return true;
  else if (prevProps.month === nextProps.month)
    return true;
  else if (prevProps.buildingName === nextProps.buildingName)
    return true;
  else if (prevProps.date === nextProps.date)
    return true;
  else return false;
})
