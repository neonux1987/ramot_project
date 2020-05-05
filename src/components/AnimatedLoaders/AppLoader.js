import React from 'react';
import { AlignCenterMiddle } from '../AlignCenterMiddle/AlignCenterMiddle';
import { RotateLoader } from 'react-spinners';

export default (props) => {

  return (
    <AlignCenterMiddle style={{ height: "100%", ...props.style }}>
      <div
        style={{
          marginLeft: "50px",
          color: "#000000",
          fontWeight: "600",
          fontSize: "18px",
        }}
      >טוען את האפליקציה
      </div>
      <RotateLoader
        margin={2}
        size={15}
        color={"#000000"}
        loading={props.loading}
      />
    </AlignCenterMiddle>
  );
}