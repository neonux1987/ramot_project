// LIBRARIES
import React from 'react';
import { Divider } from '@material-ui/core';

const CustomDivider = ({ margin = "30px 0" }) => {

  return (<Divider style={{ margin }} />);
}

export default CustomDivider;