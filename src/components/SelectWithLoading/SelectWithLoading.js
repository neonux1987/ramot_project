import React from 'react';
import { Select } from '@material-ui/core';
import Spinner from '../Spinner/Spinner';
import SelectLoader from '../AnimatedLoaders/SelectLoader';


const SelectWithLoading = props => {
  return (
    <Select {...props}>
      {props.loading ? <SelectLoader /> : props.children}
    </Select>
  );

}

export default SelectWithLoading;
