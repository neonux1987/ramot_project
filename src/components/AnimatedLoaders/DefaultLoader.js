import React from 'react';
import { AlignCenterMiddle } from '../AlignCenterMiddle/AlignCenterMiddle';
import { ScaleLoader } from 'react-spinners';

export default (props) => {
  const { loading, title = "טוען הגדרות", loaderColor = "#000000" } = props;
  return (
    <AlignCenterMiddle style={{ height: "100%", ...props.style }}>
      <div
        style={{
          marginLeft: "20px",
          color: "#000000",
          fontWeight: "600",
          fontSize: "16px",
        }}
      >
        {title}
      </div>
      <ScaleLoader
        margin={2}
        radius={2}
        width={4}
        height={35}
        size={10}
        color={loaderColor}
        loading={loading}
      />
    </AlignCenterMiddle>
  );
}