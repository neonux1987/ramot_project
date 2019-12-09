import React from 'react';

export default React.memo(({ children, style, show = true }) => {
  return (
    <div className="_tableColumn" style={{
      display: show ? "flex" : "none",
      justifyContent: "center",
      alignItems: "center",
      whiteSpace: "pre-wrap",
      textAlign: "center",
      overflow: "hidden",
      ...style
    }}>
      <div>{children}</div>
    </div>);
}, areEqual);

function areEqual(prevProps, nextProps) {
  if (prevProps.children === nextProps.children)
    return true;
  else return false;
}