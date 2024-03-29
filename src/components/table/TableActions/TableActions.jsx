import React from "react";
import styles from "./TableActions.module.css";
import YesNoDialog from "./YesNoDialog/YesNoDialog";
import DeleteForeverIcon from "../../Icons/DeleteForeverIcon";

const TableActions = (props) => {
  const [showDialog, setShowDialog] = React.useState(false);

  const showDialogHandler = () => {
    setShowDialog(true);
  };

  const closeDialogHandler = () => {
    setShowDialog(false);
  };

  const render = showDialog ? (
    <YesNoDialog
      closeDialog={closeDialogHandler}
      show={showDialog}
      deleteHandler={props.deleteHandler}
    />
  ) : (
    <button onClick={showDialogHandler} className={styles.btn}>
      <DeleteForeverIcon className={styles.icon} />
    </button>
  );

  return <div className={styles.wrapper}>{render}</div>;
};

export default TableActions;
