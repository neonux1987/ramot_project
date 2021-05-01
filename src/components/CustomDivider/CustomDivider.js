// LIBRARIES
import React from 'react';
import { Divider } from '@material-ui/core';

const CustomDivider = ({ mt = 0, mr = 0, mb = 0, ml = 0 }) => {

  return (<Divider style={{
    marginTop: mt + "px",
    marginRight: mr + "px",
    marginBottom: mb + "px",
    marginLeft: ml + "px",
    backgroundColor: "#f1f1f1"
  }} />);
}

export default CustomDivider;