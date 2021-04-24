import React from 'react';

const Cell = ({ children, style, className = "" }) => {

  return (
    <div className={`tableCell ${className}`} style={style}>
      {children}
    </div>);
};

function areEqual(prevProps, nextProps) {
  if (prevProps.children === nextProps.children)
    return true;
  else return false;
}

export default React.memo(Cell, areEqual)