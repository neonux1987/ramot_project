import React from 'react';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Slide from '@material-ui/core/Slide';
import useModalLogic from '../../customHooks/useModalLogic';
import ModalButton from '../buttons/ModalButton';
import Dialog from './Dialog';
import ModalHeader from './ModalHeader';

const Modal = (props) => {

  const {
    agreeBtnText = "בצע פעולה",
    cancelBtnText = "בטל",
    valid,
    iconColor = "#ffffff",
    onAgreeHandler,
    onCancelHandler,
    onBackdropClickHandler,
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

  const onBackdropClick = () => {
    onBackdropClickHandler && onBackdropClickHandler();
    onEscapeKeyDown();
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
    onEscapeKeyDown={onEscapeKeyDown}
    onKeyPress={onKeyPressHandler}
    onBackdropClick={onBackdropClick}
  >
    <ModalHeader title={title} Icon={Icon} iconColor={iconColor} />

    <DialogContent>
      {content}
    </DialogContent>
    <DialogActions>
      <ModalButton onClick={cancel}>
        {cancelBtnText}
      </ModalButton>
      <ModalButton onClick={agree}>
        {agreeBtnText}
      </ModalButton>
    </DialogActions>
  </Dialog>;
}

export default Modal;