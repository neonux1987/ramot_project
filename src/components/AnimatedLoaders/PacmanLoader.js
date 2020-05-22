import React, { Fragment } from 'react';
import { PacmanLoader } from 'react-spinners';

export default (props) => {
  const { loading, title = "טוען נתונים", loaderColor = "#000000" } = props;
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
      <PacmanLoader
        margin={2}
        size={10}
        color={loaderColor}
        loading={loading}
      />
    </Fragment>
  );
}