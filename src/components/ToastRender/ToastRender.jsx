import React from "react";
import Spinner from "../Spinner/Spinner";
import CloseIcon from "../Icons/CloseIcon";

const ToastRender = ({
  message = "",
  spinner = false,
  done = false,
  spinnerColor
}) => {
  let renderSpinner = spinner ? (
    <Spinner color={spinnerColor} size={24} />
  ) : null;
  let renderDoneIcon = done ? <CloseIcon /> : null;
  return (
    <div
      style={{
        justifyContent: "center",
        display: "inline-flex",
        alignItems: "center",
        textAlign: "right"
      }}
    >
      <div style={{ marginLeft: "5px" }}>
        {renderDoneIcon}
        {renderSpinner}
      </div>
      <span>{message}</span>
    </div>
  );
};

export default ToastRender;
