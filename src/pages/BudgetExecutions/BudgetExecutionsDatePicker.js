import React, { useEffect, useState } from 'react';
import { updateDate } from '../../redux/actions/budgetExecutionsActions';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRegisteredYears } from '../../redux/actions/registeredYearsActions';
import DatePicker from '../../components/DatePicker/DatePicker';
import { fetchRegisteredQuarters } from '../../redux/actions/registeredQuartersActions';
import useRefresh from '../../customHooks/useRefresh';

const BudgetExecutionsDatePicker = ({
  buildingId,
  date
}) => {
  const dispatch = useDispatch();

  const [refresh, setRefresh] = useRefresh();

  const [localYear, setLocalYear] = useState(date.year);

  const quarters = useSelector(store => store.registeredQuarters[buildingId]);
  const years = useSelector(store => store.registeredYears[buildingId]);

  // initial fetch of years
  useEffect(() => {
    dispatch(fetchRegisteredYears({ buildingId }));
  }, [buildingId, dispatch]);

  // initial fetch of quarters if year is not empty
  useEffect(() => {
    if (date.year !== "")
      dispatch(fetchRegisteredQuarters({
        buildingId,
        date: {
          year: date.year
        }
      }));

    if (refresh === true)
      setRefresh(false);
    //eslint-disable-next-line
  }, [refresh, setRefresh]);

  const quarterExist = (month, data) => {
    let exist = false;
    data.forEach((item) => {
      if (month === item.month)
        exist = true;
    });
    return exist;
  }

  const onChange = (name, value) => {

    if (name === "year") {
      setLocalYear(value);

      dispatch(fetchRegisteredQuarters({
        buildingId,
        date: {
          year: value
        }
      })).then(({ data }) => {
        // load the same quarter of the previous year if exist in the chosen year
        // if not load just the first quarter availble in the list
        const quarter = quarterExist(date.quarter, data) ? date.quarter : data[0].quarter;
        dispatch(updateDate(buildingId, { year: value, quarter }));
      });
    }
    else {
      dispatch(updateDate(buildingId, { year: localYear, quarter: value }));
    }
  };

  return <DatePicker
    date={date}
    quarter
    quartersList={quarters.data}
    yearsList={years.data}
    onChange={onChange}
    yearsFetching={years.isFetching}
    quratersFetching={quarters.isFetching}
  />

}

export default React.memo(BudgetExecutionsDatePicker);