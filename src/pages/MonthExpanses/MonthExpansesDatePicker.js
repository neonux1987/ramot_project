import React, { useEffect, useState } from 'react';
import { updateDate } from '../../redux/actions/monthExpansesActions';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRegisteredYears } from '../../redux/actions/registeredYearsActions';
import { fetchRegisteredMonths } from '../../redux/actions/registeredMonthsActions';
import DatePicker from '../../components/DatePicker/DatePicker';
import Helper from '../../helpers/Helper';
import useRefresh from '../../customHooks/useRefresh';

const MonthExpansesDatePicker = ({
  buildingId,
  date
}) => {
  const dispatch = useDispatch();

  const [refresh, setRefresh] = useRefresh();

  const [localYear, setLocalYear] = useState(date.year);

  const months = useSelector(store => store.registeredMonths[buildingId]);
  const years = useSelector(store => store.registeredYears[buildingId]);

  // initial fetch of years
  useEffect(() => {
    dispatch(fetchRegisteredYears({ buildingId }));
  }, [buildingId, dispatch]);

  // initial fetch of months if year is not empty
  useEffect(() => {
    const fetchMonths = () => {
      if (date.year !== "")
        dispatch(fetchRegisteredMonths({
          buildingId,
          date: {
            year: date.year
          }
        }));
    }

    fetchMonths();

    if (refresh === true)
      setRefresh(false);
    //eslint-disable-next-line
  }, [refresh, setRefresh]);

  const monthExist = (month, data) => {
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

      dispatch(fetchRegisteredMonths({
        buildingId,
        date: {
          year: value
        }
      })).then(({ data }) => {
        // load the same month of the previous year if exist in the chosen year
        // if not load just the first month availble in the list
        const month = monthExist(date.month, data) ? date.month : data[0].month;
        dispatch(updateDate(buildingId, {
          year: value,
          month,
          monthHeb: Helper.convertEngToHebMonth(month),
          monthNum: Helper.convertEngToMonthNum(month),
          quarter: Helper.engMonthToQuarter(month)
        }));
      });
    }
    else {
      dispatch(updateDate(buildingId, {
        year: localYear,
        month: value,
        monthHeb: Helper.convertEngToHebMonth(value),
        monthNum: Helper.convertEngToMonthNum(value),
        quarter: Helper.engMonthToQuarter(value)
      }));
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