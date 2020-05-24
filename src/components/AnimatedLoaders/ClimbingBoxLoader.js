import React, { Fragment } from 'react';
import { ClimbingBoxLoader } from 'react-spinners';

export default (props) => {
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
      <ClimbingBoxLoader
        size={size}
        color={loaderColor}
        loading={loading}
      />
    </Fragment>
  );
}