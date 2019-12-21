import React from 'react';
import DateDetails from '../components/DateDetails/DateDetails';

export default (WrappedComponent) => {
  console.log("asdsa");
  const dateDetails = (date) => {
    return () => <DateDetails
      month={date.monthHeb}
      quarter={date.quarter}
      year={date.year}
    />
  }

  return (props) => <WrappedComponent dateDetails={dateDetails} {...props} />
}