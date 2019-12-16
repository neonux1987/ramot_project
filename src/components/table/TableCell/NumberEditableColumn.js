import React from 'react';
import EditableColumn from './EditableColumn';

numberInput = ({ key, value, index, handlers = {} }) => {
  const newValue = value === 0 ? "" : value;
  return <EditableColumn
    type="number"
    value={newValue}
    {...handlers}
  />
};