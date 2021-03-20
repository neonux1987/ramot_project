import React, { useEffect, useState } from 'react';
import { updateDate } from '../../redux/actions/monthExpansesActions';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRegisteredYears } from '../../redux/actions/registeredYearsActions';
import { fetchRegisteredMonths } from '../../redux/actions/registeredMonthsActions';
import DatePicker from '../../components/DatePicker/DatePicker';

const MonthExpansesDatePicker = ({
  buildingNameEng,
  date
}) => {
  const dispatch = useDispatch();

  const [localYear, setLocalYear] = useState(date.year);

  const months = useSelector(store => store.registeredMonths[buildingNameEng]);
  const years = useSelector(store => store.registeredYears[buildingNameEng]);

  // initial fetch of years
  useEffect(() => {
    dispatch(fetchRegisteredYears({ buildingNameEng }));
  }, [buildingNameEng, dispatch]);

  // initial fetch of months if year is not empty
  useEffect(() => {
    const fetchMonths = () => {
      if (date.year !== "")
        dispatch(fetchRegisteredMonths({
          buildingNameEng,
          date: {
            year: date.year
          }
        }));
    }

    fetchMonths();
    //eslint-disable-next-line
  }, []);

  const onChange = (name, value) => {

    if (name === "year") {
      setLocalYear(value);

      dispatch(fetchRegisteredMonths({
        buildingNameEng,
        date: {
          year: value
        }
      }));
    }
    else {
      dispatch(updateDate(buildingNameEng, { year: localYear, month: value }));
    }
  };

  return <DatePicker
    date={date}
    month
    monthsList={months.data}
    yearsList={years.data}
    onChange={onChange}
    yearsFetching={years.isFetching}
    monthsFetching={months.isFetching}
  />

}

export default React.memo(MonthExpansesDatePicker);