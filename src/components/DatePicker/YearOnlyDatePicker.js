import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRegisteredYears } from '../../redux/actions/registeredYearsActions';
import DatePicker from './DatePicker';
import useRefresh from '../../customHooks/useRefresh';

const YearOnlyDatePicker = ({
  buildingId,
  date,
  updateDate,
  blackLabels
}) => {
  const dispatch = useDispatch();

  const [refresh, setRefresh] = useRefresh();

  const years = useSelector(store => store.registeredYears[buildingId]);

  useEffect(() => {
    dispatch(fetchRegisteredYears({ buildingId }));

    if (refresh === true)
      setRefresh(() => false);
  }, [buildingId, dispatch, refresh, setRefresh]);

  const onChange = (name, value) => {
    dispatch(updateDate(buildingId, { [name]: value }));
  };

  return <DatePicker
    date={date}
    yearsList={years.data}
    yearsLoading={years.isFetching}
    onChange={onChange}
    blackLabels={blackLabels}
  />

}

export default React.memo(YearOnlyDatePicker);