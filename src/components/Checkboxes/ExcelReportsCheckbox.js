import React from 'react';
import CheckboxWithLabel from './CheckboxWithLabel';

const ExcelReportsCheckbox = ({ color, ...otherProps }) => {
  return <CheckboxWithLabel
    color="#0066a2"
    {...otherProps}
  />;
}

export default ExcelReportsCheckbox;