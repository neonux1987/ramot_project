import React from 'react';

function DefaultCell(props) {
  console.log("default");
  return <span title={props.title}>{props.defaultValue}</span>;
};

function areEqual(prevProps, nextProps) {
  console.log("prevProps");
  console.log(nextProps);
  if (prevProps.defaultValue === nextProps.defaultValue) {

    return true;
  }
  else return false;
}

export default React.memo(DefaultCell, areEqual);