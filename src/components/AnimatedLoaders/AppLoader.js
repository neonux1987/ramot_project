import React from 'react';
import { AlignCenterMiddle } from '../AlignCenterMiddle/AlignCenterMiddle';
import { RotateLoader } from 'react-spinners';

export default (props) => {

  return (
    <AlignCenterMiddle style={{ height: "100%", ...props.style }}>
      <div
        style={{
          marginLeft: "50px",
          color: "#4f53c7",
          fontWeight: "600",
          fontSize: "18px",
        }}
      >טוען הגדרות
      </div>
      <RotateLoader
        margin={2}
        size={15}
        color={"#123abc"}
        loading={props.loading}
      />
    </AlignCenterMiddle>
  );
}