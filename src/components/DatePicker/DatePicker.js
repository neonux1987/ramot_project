import React, { useState, useEffect } from 'react';
import { MenuItem } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import Helper from '../../helpers/Helper';
import { fetchRegisteredMonths, cleanupMonths } from '../../redux/actions/registeredMonthsActions';
import { fetchRegisteredYears, cleanupYears } from '../../redux/actions/registeredYearsActions';
import { fetchRegisteredQuarters, cleanupQuarters } from '../../redux/actions/registeredQuartersActions';
import Select from '../Select/Select';
import FormWrapper from '../FormWrapper/FormWrapper';
import { updateDate } from '../../redux/actions/budgetExecutionsActions';

const DatePicker = ({
  quarter = false,
  month = false,
  date,
  buildingNameEng,
  pageName
}) => {
  const dispatch = useDispatch();

  const months = useSelector(store => month ? store.registeredMonths[buildingNameEng] : undefined);
  const quarters = useSelector(store => quarter ? store.registeredQuarters[buildingNameEng] : undefined);
  const years = useSelector(store => store.registeredYears[buildingNameEng]);

  const [selectDate, setDate] = useState({
    year: date.year,
    quarter: date.quarter,
    month: date.month
  });

  useEffect(() => {
    dispatch(fetchRegisteredYears({ buildingNameEng })).then(() => {
      if (month && date.year !== undefined)
        dispatch(fetchRegisteredMonths({
          buildingNameEng,
          date: {
            year: date.year
          }
        }));

      if (quarter && date.year !== undefined)
        dispatch(fetchRegisteredQuarters({
          buildingNameEng,
          date: {
            year: date.year
          }
        }));
    });

  }, [month, quarter, dispatch, pageName, buildingNameEng, date.year]);

  const onMonthChange = (event) => {
    const { value } = event.target;

    const newDate = Helper.generateAllDateByMonthName(value);
    newDate.year = selectDate.year;

    setDate({
      ...selectDate,
      month: value,
      quarter: newDate.quarter
    });

    dispatch(updateDate(buildingNameEng, newDate));
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
    dispatch(updateDate(buildingNameEng, newDate));
  }

  const onYearChangeHandler = (event) => {
    const { value } = event.target;
    const year = Number.parseInt(value);

    if (month) {
      dispatch(fetchRegisteredMonths({ buildingNameEng, date: { year } })).then((result) => {
        // get the earliest month in the list 
        const month = result.data[0].month;

        const newDate = Helper.generateAllDateByMonthName(month);
        newDate.year = year;

        setDate({
          ...selectDate,
          month,
          quarter: newDate.quarter,
          year
        });

        dispatch(updateDate(buildingNameEng, newDate));

      });
    }

    if (quarter) {
      dispatch(fetchRegisteredQuarters({
        buildingNameEng,
        date: {
          year
        }
      })).then((result) => {
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
        dispatch(updateDate(buildingNameEng, newDate));

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
  const renderMonths = () => <Select
    name="month"
    label={"חודש:"}
    value={selectDate.month || ""}
    onChange={onMonthChange}
    disabled={months.data.length === 0 ? true : false}
    loading={month === undefined}
  >
    {months.data.length === 0 || monthExist() === false ? <MenuItem value={selectDate.month}>בחר חודש</MenuItem> : null}
    {months.data.map((month) => {
      return <MenuItem value={month.month} key={month.id}>{month.monthHeb}</MenuItem>;
    })}
  </Select>;

  //if quarters data exist, render it
  const renderQuarters = () => <Select
    name="quarter"
    label={"רבעון:"}
    value={selectDate.quarter || ""}
    onChange={onQuarterChangeHandler}
    disabled={quarters.data.length === 0 ? true : false}
    loading={quarter === undefined}
  >
    {quarters.data.length === 0 || quarterExist() === false ? <MenuItem value={selectDate.quarter}>בחר רבעון</MenuItem> : null}
    {quarters.data.map((quarter) => {
      return <MenuItem value={quarter.quarter} key={quarter.id}>{quarter.quarterHeb}</MenuItem>;
    })}
  </Select>;

  //if years data exist, render it
  const renderYears = <Select
    name="year"
    label={"שנה:"}
    value={selectDate.year || "choose year"}
    onChange={onYearChangeHandler}
  >
    {years.data.length === 0 || yearExist() === false || date.year === undefined
      ? <MenuItem value={selectDate.year || "choose year"}>בחר שנה</MenuItem> : null}
    {years.data.map((year) => {
      return <MenuItem value={year.year} key={year.id}>{year.year}</MenuItem>;
    })}
  </Select>;

  return <FormWrapper>
    {renderYears}
    {quarter && renderQuarters()}
    {month && renderMonths()}
  </FormWrapper>;

}

export default React.memo(DatePicker, (prevProps, nextProps) => {
  if (
    prevProps.year === nextProps.year &&
    prevProps.quarter === nextProps.quarter &&
    prevProps.month === nextProps.month &&
    prevProps.buildingNameEng === nextProps.buildingNameEng &&
    prevProps.pageName === nextProps.pageName &&
    prevProps.date === nextProps.date
  )
    return true;
});