import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRegisteredYears } from '../../redux/actions/registeredYearsActions';
import DatePicker from './DatePicker';

const YearOnlyDatePicker = ({
  buildingNameEng,
  date,
  updateDate
}) => {
  const dispatch = useDispatch();

  const years = useSelector(store => store.registeredYears[buildingNameEng]);

  useEffect(() => {
    dispatch(fetchRegisteredYears({ buildingNameEng }));
  }, [buildingNameEng, dispatch]);

  const onChange = (name, value) => {
    dispatch(updateDate(buildingNameEng, { [name]: value }));
  };

  return <DatePicker
    date={date}
    yearsList={years.data}
    yearsLoading={years.isFetching}
    onChange={onChange}
  />

}

export default React.memo(YearOnlyDatePicker);