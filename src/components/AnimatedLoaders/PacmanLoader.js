import React, { Fragment } from 'react';
import { PacmanLoader as PL } from 'react-spinners';

const PacmanLoader = (props) => {
  const { loading, title = "טוען נתונים", loaderColor = "#000000", size = 10, margin = 2 } = props;
  return (
    <Fragment>
      <div
        style={{
          marginLeft: "40px",
          color: "#000000",
          fontWeight: "600",
          fontSize: "16px",
        }}
      >
        {title}
      </div>
      <PL
        margin={margin}
        size={size}
        color={loaderColor}
        loading={loading}
      />
    </Fragment>
  );
}

export default PacmanLoader;