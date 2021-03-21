import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import useModalLogic from '../../customHooks/useModalLogic';
import { css } from 'emotion';

const dialog = css`
  width: 500px;
`;

const header = css`
  display: flex; 
  align-items: center;
`;

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Modal = (props) => {

  const {
    agreeBtnText = "בצע פעולה",
    cancelBtnText = "בטל",
    valid,
    iconColor = "#ffffff",
    onAgreeHandler,
    onCancelHandler,
    title,
    contentText,
    Icon,
    children
  } = props;

  const [open, setOpen] = React.useState(true);
  const { hideModal } = useModalLogic();

  const agree = () => {
    if (valid === undefined || valid) {
      setOpen(false);
      onAgreeHandler();
      hideModal();
    }
  };

  const cancel = () => {
    onCancelHandler && onCancelHandler();
    onEscapeKeyDown();
  }

  const onEscapeKeyDown = () => {
    setOpen(false);
    hideModal();
  }

  const onKeyPressHandler = (event) => {
    // Number 13 is the "Enter" key on the keyboard
    if (event.key === "Enter") {
      // Cancel the default action, if needed
      event.preventDefault();
      agree();
    }
  }

  const content = !contentText ? children : <DialogContentText id="alert-dialog-slide-description">
    {contentText}
  </DialogContentText>;

  return <Dialog
    open={open}
    TransitionComponent={Transition}
    keepMounted
    onEscapeKeyDown={onEscapeKeyDown}
    onKeyPress={onKeyPressHandler}
    onBackdropClick={onEscapeKeyDown}
    aria-labelledby="alert-dialog-slide-title"
    aria-describedby="alert-dialog-slide-description"
    fullWidth
    maxWidth="xs"
  >
    <div className={header}>
      <Icon style={{
        margin: "16px 24px 16px 0",
        color: iconColor,
        fontSize: "28px",
      }} />
      <DialogTitle id="alert-dialog-slide-title" style={{ paddingRight: "12px", flex: "initial" }}>{title}</DialogTitle>
    </div>

    <DialogContent>
      {content}
    </DialogContent>
    <DialogActions>
      <Button onClick={cancel}>
        {cancelBtnText}
      </Button>
      <Button onClick={agree}>
        {agreeBtnText}
      </Button>
    </DialogActions>
  </Dialog>;
}

export default Modal;