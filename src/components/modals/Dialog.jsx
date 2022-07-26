import React from "react";
import { Dialog as Dlg } from "@material-ui/core";
import Slide from "@material-ui/core/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Dialog = (props) => {
  const {
    open = false,
    children,
    onKeyPressHandler,
    invisibleBackdrop = false,
    onClose
  } = props;

  return (
    <Dlg
      BackdropProps={{
        invisible: invisibleBackdrop
      }}
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onKeyPress={onKeyPressHandler}
      onClose={onClose}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      {children}
    </Dlg>
  );
};

export default Dialog;
