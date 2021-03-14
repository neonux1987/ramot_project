import React, { useCallback, useEffect, useState } from 'react';
import { updateDate } from '../../redux/actions/monthExpansesActions';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRegisteredYears } from '../../redux/actions/registeredYearsActions';
import { fetchRegisteredMonths } from '../../redux/actions/registeredMonthsActions';
import DatePickerV2 from './DatePickerV2';

const MonthExpansesDatePicker = ({
  buildingNameEng,
  date
}) => {

  const dispatch = useDispatch();

  const [localYear, setLocalYear] = useState(date.year);

  const months = useSelector(store => store.registeredMonths[buildingNameEng].data);
  const years = useSelector(store => store.registeredYears[buildingNameEng].data);

  useEffect(() => {
    dispatch(fetchRegisteredYears({ buildingNameEng }));
  }, [buildingNameEng, dispatch]);

  /* useEffect(() => {
    if (date.year !== "") {
      dispatch(fetchRegisteredYears({ buildingNameEng })).then(() => {
        dispatch(fetchRegisteredMonths({
          buildingNameEng,
          date: {
            year: date.year
          }
        }));
      });
    }
    else if (date.month !== "") {
      dispatch(fetchRegisteredMonths({
        buildingNameEng,
        date: {
          year: date.year
        }
      }));
    }
  }, [years]); */

  const onChange = useCallback((name, value) => {

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
      dispatch(updateDate(buildingNameEng, { year: localYear }));
    }
  }, [onChange])

  return <DatePickerV2
    date={date}
    month
    monthsList={months}
    yearsList={years}
    onChange={onChange}
  />

}

export default React.memo(MonthExpansesDatePicker);