import React from "react";
import styles from "./YesNoDialog.module.css";
import CheckIcon from "../../../Icons/CheckIcon";
import CloseIcon from "../../../Icons/CloseIcon";

const YesNoDialog = ({ closeDialog, deleteHandler }) => {
  return (
    <div className={styles.dialog}>
      <button
        onClick={() => {
          closeDialog();
          deleteHandler();
        }}
        className={styles.btn + " " + styles.done}
      >
        <CheckIcon width="22px" height="22px" />
      </button>
      <button onClick={closeDialog} className={styles.btn + " " + styles.close}>
        <CloseIcon width="22px" height="22px" />
      </button>
    </div>
  );
};

export default YesNoDialog;
