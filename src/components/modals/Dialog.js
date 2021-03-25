import React from 'react';
import { Dialog as Dlg } from '@material-ui/core';
import Slide from '@material-ui/core/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Dialog = (props) => {

  const {
    open = false,
    children,
    onEscapeKeyDown,
    onKeyPressHandler,
    onBackdropClick
  } = props;

  return <Dlg
    open={open}
    TransitionComponent={Transition}
    keepMounted
    onEscapeKeyDown={onEscapeKeyDown}
    onKeyPress={onKeyPressHandler}
    onBackdropClick={onBackdropClick}
    aria-labelledby="alert-dialog-slide-title"
    aria-describedby="alert-dialog-slide-description"
    fullWidth
    maxWidth="xs"
  >
    {children}
  </Dlg>;
}

export default Dialog;