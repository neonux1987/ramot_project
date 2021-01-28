import React, { Fragment } from 'react';
import { ClimbingBoxLoader as CBL } from 'react-spinners';

const ClimbingBoxLoader = (props) => {
  const { loading, title = "", loaderColor = "#000000", size = 15 } = props;
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
      <CBL
        size={size}
        color={loaderColor}
        loading={loading}
      />
    </Fragment>
  );
}

export default ClimbingBoxLoader;