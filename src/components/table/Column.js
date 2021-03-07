import React from 'react';

const Column = ({ children, style, innerStyle, show = true, onDoubleClick, className }) => {
  return (
    <div className={`_tableColumn ${className}`}
      style={{
        display: show ? "flex" : "none",
        justifyContent: "center",
        alignItems: "center",
        whiteSpace: "pre-wrap",
        wordBreak: "break-word",
        textAlign: "center",
        overflow: "hidden",
        ...style
      }}
      onDoubleClick={onDoubleClick}
    >
      <div style={innerStyle}>{children}</div>
    </div>);
};

function areEqual(prevProps, nextProps) {
  if (prevProps.children === nextProps.children)
    return true;
  else return false;
}

export default React.memo(Column, areEqual)