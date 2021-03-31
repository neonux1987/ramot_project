import React, { useEffect, useState } from 'react';
import { updateDate } from '../../redux/actions/monthExpansesActions';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRegisteredYears } from '../../redux/actions/registeredYearsActions';
import { fetchRegisteredMonths } from '../../redux/actions/registeredMonthsActions';
import DatePicker from '../../components/DatePicker/DatePicker';
import Helper from '../../helpers/Helper';

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
        buildingNameEng,
        date: {
          year: value
        }
      })).then(({ data }) => {
        // load the same month of the previous year if exist in the chosen year
        // if not load just the first month availble in the list
        const month = monthExist(date.month, data) ? date.month : data[0].month;
        dispatch(updateDate(buildingNameEng, {
          year: value,
          month,
          monthHeb: Helper.convertEngToHebMonth(month),
          monthNum: Helper.convertEngToMonthNum(month),
          quarter: Helper.engMonthToQuarter(month)
        }));
      });
    }
    else {
      dispatch(updateDate(buildingNameEng, {
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