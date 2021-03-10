import React, { useState, useEffect } from 'react';
import { Select, MenuItem, InputLabel } from '@material-ui/core';
import Spinner from '../Spinner/Spinner';
import { useSelector, useDispatch } from 'react-redux';
import { updateDate } from '../../redux/actions/dateActions';
import { fetchRegisteredYears } from '../../redux/actions/registeredYearsActions';

const DateRangePicker = ({ buildingName, pageName, date }) => {
  const dispatch = useDispatch();
  const currentDate = new Date();
  const { data, isFetching } = useSelector(store => store.registeredYears.pages[pageName][buildingName]);

  const [selectDate, setDate] = useState({
    fromYear: date.fromYear ? date.fromYear : "",
    toYear: currentDate.getFullYear()
  });
  console.log(date);
  useEffect(() => {
    dispatch(fetchRegisteredYears({ pageName, buildingName }));
  }, [dispatch, pageName, buildingName]);

  useEffect(() => {
    setDate(() => ({
      ...selectDate,
      fromYear: date.fromYear ? date.fromYear : "",
    }));
  }, [date]);

  const onChange = (event) => {
    const { value, name } = event.target;
    const newValue = Number.parseInt(value);
    updateDate(buildingName, pageName, selectDate);
    /* setDate(() => {
      updateDate(buildingName, pageName, selectDate);
      return {
        ...selectDate,
        [name]: newValue
      };
    }); */

  }

  if (isFetching || selectDate.fromYear === 0)
    return <div>yes</div>

  const fromList = () => {
    return data.map(({ year }) => {
      return <MenuItem key={year} value={year}>{year}</MenuItem>
    });
  }

  //if years data exist, render it
  const fromSelect = <div>
    <InputLabel id="label">מ- </InputLabel>
    <Select
      name="fromYear"
      value={selectDate.fromYear}
      onChange={onChange}
    >
      {fromList()}
    </Select>
  </div>;

  return (
    <div>
      <form>
        {fromSelect}
      </form>
    </div>
  );

}

const FormSelectDummy = () => {
  return <div>
    <Spinner size={18} />
  </div>
}

export default React.memo(DateRangePicker);