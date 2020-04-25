// LIBRARIES
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';

// ACTIONS
import {
  updateDate,
  initDateState,
  dateCleanup
} from '../../redux/actions/dateActions';

const DateProvider = (props) => {

  const {
    pageName,
    buildingName,
    initState,
  } = props;

  const date = useSelector(store => store.date.pages[pageName]);

  const dispatch = useDispatch();

  useEffect(() => {
    if (date === undefined || date[buildingName] === undefined)
      // init the state first
      dispatch(initDateState(pageName, buildingName, initState));
  }, [pageName, buildingName, initState, dispatch, date]);

  return props.children({
    date,
    actions: {
      updateDate: () => dispatch(updateDate(pageName, buildingName, date))
    }
  });

};

DateProvider.propTypes = {
  pageName: PropTypes.string.isRequired
};

export default DateProvider;