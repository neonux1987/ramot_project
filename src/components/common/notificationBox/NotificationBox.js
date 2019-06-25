import React from 'react';
import styles from './NotificationBox.module.css';
import { Typography } from '@material-ui/core';
import { ErrorOutline, Info } from '@material-ui/icons';

const NotificationBox = ({ isError = false, isVisible = false }, props) => {

  const visibility = isVisible ? "block" : "hidden";
  const errorText = isError ? "שגיאה" : "הודעה";
  const icon = isError ? <ErrorOutline className={styles.headerIconError} /> : <Info className={styles.headerIconInfo} />

  return (
    <div className={styles.wrapper} style={{ visibility: visibility }}>
      <div className={styles.header}>
        {icon}
        <Typography variant="subtitle1" classes={{ subtitle1: styles.headerTitle }}>{errorText}</Typography>
      </div>
      <Typography classes={{ root: styles.body }}>התרחשה שגיאה של בסיס נתונים
      </Typography>
    </div >
  );

}

export default NotificationBox;