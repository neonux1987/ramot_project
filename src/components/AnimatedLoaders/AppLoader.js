import React from 'react';
import { AlignCenterMiddle } from '../AlignCenterMiddle/AlignCenterMiddle';
import { RotateLoader } from 'react-spinners';

export default ({ title = "טוען את האפליקציה", loading = false, style, size = 14 }) => {

  return (
    <AlignCenterMiddle style={{ height: "100%", ...style }}>
      <div
        style={{
          marginLeft: "50px",
          color: "#000000",
          fontWeight: "600",
          fontSize: "18px",
        }}
      >
        {title}
      </div>
      <RotateLoader
        margin={2}
        size={size}
        color={"#000000"}
        loading={loading}
      />
    </AlignCenterMiddle>
  );
}