import React from 'react';
import CloseIcon from '@material-ui/icons/Close';
import styles from './CustomCloseButton.module.css';

const CustomCloseButton = ({ closeToast }) => (
  <i
    className={styles.button}
    onClick={closeToast}
  >
    <CloseIcon />
  </i>
);

export default CustomCloseButton;