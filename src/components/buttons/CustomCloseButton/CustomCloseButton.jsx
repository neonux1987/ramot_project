import React from "react";
import styles from "./CustomCloseButton.module.css";
import CloseIcon from "../../Icons/CloseIcon";

const CustomCloseButton = ({ closeToast }) => (
  <i className={styles.button} onClick={closeToast}>
    <CloseIcon />
  </i>
);

export default CustomCloseButton;
