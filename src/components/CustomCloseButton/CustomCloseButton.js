import React from 'react';
import CloseIcon from '@material-ui/icons/Close';
import styles from './CustomCloseButton.module.css';

export default ({ closeToast }) => (
  <i
    className={styles.button}
    onClick={closeToast}
  >
    <CloseIcon />
  </i>
);