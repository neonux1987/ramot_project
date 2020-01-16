import React, { useState, useEffect } from 'react';
import { Select, Button, MenuItem } from '@material-ui/core';
import styles from './DatePicker.module.css';
import Spinner from '../Spinner/Spinner';
import { useSelector, useDispatch } from 'react-redux';
import registeredMonthsActions from '../../redux/actions/registeredMonthsActions';
import registeredQuartersActions from '../../redux/actions/registeredQuartersActions';
import registeredYearsActions from '../../redux/actions/registeredYearsActions';

const DatePicker = ({
  quarter = false,
  month = false,
  date,
  submitHandler,
  buildingName
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

    // we must intialize month and quarter to empty
    // string so the current date won't interfer 
    // with the selected values, because current date
    // maybe different than the selected values
    setDate({
      year,
      month: "",
      monthHeb: "",
      quarterHeb: "",
      quarterEng: ""
    });

    if (month) {
      dispatch((registeredMonthsActions.fetchRegisteredMonths({ buildingName, date: { year } }))).then((result) => {
        // get the earliest month in the list 
        const month = result[0].month;

        setDate({
          ...selectDate,
          year,
          month
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

        setDate({
          ...selectDate,
          year,
          quarter: parsedQuarter
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
  const renderMonths = !months.isFetching && months.data.length > 0 ? <Select
    name="month"
    className={styles.formSelect}
    value={selectDate.month || ""}
    onChange={onChangeHandler}
  >
    {months.data.map((month) => {
      return <MenuItem value={month.month} key={month.id}>{month.monthHeb}</MenuItem>;
    })}
  </Select> : <FormSelectDummy />;

  //if quarters data exist, render it
  const renderQuarters = !quarters.isFetching && quarters.data.length > 0 ? <Select
    name="quarter"
    className={styles.formSelect}
    value={selectDate.quarter || ""}
    onChange={onChangeHandler}
  >
    {quarters.data.map((quarter) => {
      return <MenuItem value={quarter.quarter} key={quarter.id}>{quarter.quarterHeb}</MenuItem>;
    })}
  </Select> : <FormSelectDummy />;

  //if quarters data exist, render it
  const renderYears = !years.isFetching && years.data.length > 0 && yearExist() ? <Select
    name="year"
    className={styles.formSelect}
    value={selectDate.year || ""}
    onChange={onYearChangeHandler}
    classes={{ select: styles.select }}
  >
    {years.data.map((year) => {
      return <MenuItem value={year.year} key={year.id}>{year.year}</MenuItem>;
    })}
  </Select> : <FormSelectDummy />;

  return (
    <div id="dates" className={styles.dates}>
      <form className={styles.formControl}>

        {month && renderMonths}
        {quarter && renderQuarters}
        {renderYears}

      </form>
      <Button variant="contained" color="secondary" className={styles.button} onClick={() => submitHandler({
        year: selectDate.year,
        quarter: selectDate.quarter,
        month: selectDate.month
      })}>
        טען
    </Button>
    </div>
  );

}

const FormSelectDummy = () => {
  return <div className={styles.formSelect}>
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