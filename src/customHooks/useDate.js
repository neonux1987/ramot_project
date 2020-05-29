// LIBRARIES
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// ACTIONS
import { initDateState } from '../redux/actions/dateActions';

const useDate = (
  pageName,
  buildingName,
  initState
) => {

  const date = useSelector(store => store.date.pages[pageName]);

  const dispatch = useDispatch();

  const updateDate = (pageName, buildingName, date) => dispatch(updateDate(pageName, buildingName, date))

  useEffect(() => {
    if (date === undefined || date[buildingName] === undefined)
      // init the state first
      dispatch(initDateState(pageName, buildingName, initState));
  }, [pageName, buildingName, initState, dispatch, date]);

  if (date === undefined)
    return [date, updateDate];
  else
    return [date[buildingName], updateDate];
};

export default useDate;