import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import useModalLogic from '../../customHooks/useModalLogic';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default ({
  onAgreeHandler,
  onCancelHandler,
  title,
  contentText,
  Icon,
  agreeBtnText = "בצע פעולה",
  cancelBtnText = "בטל",
  children,
  valid,
  iconColor = "#ffffff",
  disableBackdropClick = false
}) => {

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
    setOpen(false);
    onCancelHandler && onCancelHandler();
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

  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={cancel}
        onEscapeKeyDown={cancel}
        onKeyPress={onKeyPressHandler}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
        disableBackdropClick={disableBackdropClick}
      >
        <div style={{ display: "flex", alignItems: "center", background: "rgb(46, 55, 62)" }}>
          <Icon style={{
            margin: "16px 24px 16px 0",
            color: iconColor,
            fontSize: "28px",
          }} />
          <DialogTitle id="alert-dialog-slide-title" style={{ paddingRight: "12px", flex: "initial", color: "#ffffff" }}>{title}</DialogTitle>
        </div>

        <DialogContent>
          {content}
        </DialogContent>
        <DialogActions>
          <Button onClick={cancel} color="primary" style={{ background: "rgb(46, 55, 62)" }} variant="contained">
            {cancelBtnText}
          </Button>
          <Button onClick={agree} color="primary" style={{ background: "rgb(46, 55, 62)" }} variant="contained">
            {agreeBtnText}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
