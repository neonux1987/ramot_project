import React from "react";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import useModalLogic from "../../customHooks/useModalLogic";
import ModalButton from "../buttons/ModalButton";
import Dialog from "./Dialog";
import ModalHeader from "./ModalHeader";

const Modal = (props) => {
  const {
    agreeBtnText = "בצע פעולה",
    hideAgreeButton = false,
    cancelBtnText = "בטל",
    valid,
    iconColor,
    onAgreeHandler,
    onCancelHandler,
    onBackdropClickHandler,
    title,
    contentText,
    Icon,
    children,
    invisibleBackdrop,
    minWidth
  } = props;

  const [open, setOpen] = React.useState(true);
  const { hideModal } = useModalLogic();

  const agree = () => {
    if (valid === undefined || valid) {
      onAgreeHandler();
      handleClose();
    }
  };

  const cancel = () => {
    onCancelHandler && onCancelHandler();
    handleClose();
  };

  const handleClose = () => {
    onBackdropClickHandler && onBackdropClickHandler();
    setOpen(false);
    hideModal();
  };

  const onKeyPressHandler = (event) => {
    // Number 13 is the "Enter" key on the keyboard
    if (event.key === "Enter") {
      // Cancel the default action, if needed
      event.preventDefault();
      agree();
    }
  };

  const content = !contentText ? (
    children
  ) : (
    <DialogContentText
      id="alert-dialog-slide-description"
      style={{ whiteSpace: "pre-line" }}
    >
      {contentText}
    </DialogContentText>
  );

  return (
    <Dialog
      open={open}
      invisibleBackdrop={invisibleBackdrop}
      onKeyPressHandler={onKeyPressHandler}
      onClose={handleClose}
      minWidth={minWidth}
    >
      <ModalHeader title={title} Icon={Icon} iconColor={iconColor} />

      <DialogContent style={{ padding: "24px" }}>{content}</DialogContent>
      <DialogActions>
        <ModalButton onClick={cancel}>{cancelBtnText}</ModalButton>
        {!hideAgreeButton && (
          <ModalButton onClick={agree}>{agreeBtnText}</ModalButton>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default Modal;
