import React from 'react';
import Row from './Row';

export default ({ gridTemplateColumns, style = {}, children }) => {
  return (
    <Row
      style={style}
      gridTemplateColumns={gridTemplateColumns}
    >
      {children}
    </Row>
  );
}