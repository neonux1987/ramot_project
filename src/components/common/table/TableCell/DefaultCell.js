import React from 'react';

export default React.memo((props) => {
  console.log("prevProps");
  return <span title={props.title}>{props.defaultValue}</span>;
}, areEqual);

function areEqual(prevProps, nextProps) {
  console.log("prevProps");
  console.log(nextProps);
  if (prevProps.defaultValue === nextProps.defaultValue) {

    return true;
  }
  else return false;
}