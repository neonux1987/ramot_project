import React from 'react';
import styles from './Notifications.module.css';
import { Typography } from '@material-ui/core';
import { ErrorOutline, Info } from '@material-ui/icons';

const Notification = ({ isError = false, isVisible = false, message = "" }, props) => {

  const errorText = isError ? "שגיאה" : "הודעה";
  const icon = isError ? <ErrorOutline className={styles.headerIconError} /> : <Info className={styles.headerIconInfo} />

  return (
    <div className={styles.notificationBox} style={{ display: isVisible ? "block" : "none" }}>
      <div className={styles.header}>
        {icon}
        <Typography variant="subtitle1" classes={{ subtitle1: styles.headerTitle }}>{errorText}</Typography>
      </div>
      <Typography classes={{ root: styles.body }}>{message}</Typography>
    </div >
  );

}

export default Notification;