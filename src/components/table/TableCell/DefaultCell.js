import React from 'react';

function DefaultCell(props) {
  return <span title={props.title}>{props.defaultValue}</span>;
};

function areEqual(prevProps, nextProps) {
  if (prevProps.defaultValue === nextProps.defaultValue) {

    return true;
  }
  else return false;
}

export default React.memo(DefaultCell, areEqual);