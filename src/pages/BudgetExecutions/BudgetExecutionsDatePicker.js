import React, { useEffect, useState } from 'react';
import { updateDate } from '../../redux/actions/budgetExecutionsActions';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRegisteredYears } from '../../redux/actions/registeredYearsActions';
import DatePicker from '../../components/DatePicker/DatePicker';
import { fetchRegisteredQuarters } from '../../redux/actions/registeredQuartersActions';

const BudgetExecutionsDatePicker = ({
  buildingNameEng,
  date
}) => {
  const dispatch = useDispatch();

  const [localYear, setLocalYear] = useState(date.year);

  const quarters = useSelector(store => store.registeredQuarters[buildingNameEng].data);
  const years = useSelector(store => store.registeredYears[buildingNameEng].data);

  useEffect(() => {
    dispatch(fetchRegisteredYears({ buildingNameEng }));
  }, [buildingNameEng, dispatch]);

  const onChange = (name, value) => {

    if (name === "year") {
      setLocalYear(value);

      dispatch(fetchRegisteredQuarters({
        buildingNameEng,
        date: {
          year: value
        }
      }));
    }
    else {
      dispatch(updateDate(buildingNameEng, { year: localYear, quarter: value }));
    }
  };

  return <DatePicker
    date={date}
    quarter
    quartersList={quarters}
    yearsList={years}
    onChange={onChange}
  />

}

export default React.memo(BudgetExecutionsDatePicker);