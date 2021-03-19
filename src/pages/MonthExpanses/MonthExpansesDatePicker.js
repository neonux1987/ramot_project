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

  const months = useSelector(store => store.registeredMonths[buildingNameEng].data);
  const years = useSelector(store => store.registeredYears[buildingNameEng].data);

  // initial fetch of years
  useEffect(() => {
    const fetchYears = () => {
      dispatch(fetchRegisteredYears({ buildingNameEng }));
    }

    fetchYears();
  }, []);

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
    monthsList={months}
    yearsList={years}
    onChange={onChange}
  />

}

export default React.memo(MonthExpansesDatePicker);