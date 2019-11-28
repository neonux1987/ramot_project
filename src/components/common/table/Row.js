import React from 'react';

export default ({ count, style = {}, children }) => {
  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: `repeat(${count},1fr)`,
      ...style
    }}>
      {children}
    </div>
  );
}