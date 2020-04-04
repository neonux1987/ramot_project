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

export default ({ onAgreeHandler, title, contentText, Icon, agreeBtnText, children }) => {

  const [open, setOpen] = React.useState(true);
  const { hideModal } = useModalLogic();

  const agree = () => {
    setOpen(false);
    onAgreeHandler();
    hideModal();
  };

  const cancel = () => {
    setOpen(false);
    hideModal();
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
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <Icon style={{
            margin: "16px 24px 16px 0",
            color: "#ffb100",
            fontSize: "28px",
          }} />
          <DialogTitle style={{ paddingRight: "12px", flex: "initial" }} id="alert-dialog-slide-title">{title}</DialogTitle>
        </div>

        <DialogContent>
          {content}
        </DialogContent>
        <DialogActions>
          <Button onClick={cancel} color="primary">
            בטל
          </Button>
          <Button onClick={agree} color="primary">
            {agreeBtnText || "בצע פעולה"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
