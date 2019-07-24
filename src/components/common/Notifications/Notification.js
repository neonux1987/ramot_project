import React from 'react';
import styles from './Notifications.module.css';
import { Typography } from '@material-ui/core';
import { ErrorOutline, Info } from '@material-ui/icons';

const Notification = ({ id, isError = false, message = "", remove }) => {

  const errorText = isError ? "שגיאה" : "הודעה";
  const icon = isError ? <ErrorOutline className={styles.headerIconError} /> : <Info className={styles.headerIconInfo} />

  let timer = setTimeout(() => {
    remove(id);
  }, 5000);

  const onMouseOverHandler = (event) => {
    if (timer) {
      clearTimeout(timer);
      timer = 0;
    }
  }

  const onMouseLeaveHandler = (event) => {
    event.preventDefault();
    timer = setTimeout(() => {
      remove(id);
    }, 2000);
  }

  return (
    <div
      className={styles.notificationBox}
      onMouseOver={onMouseOverHandler}
      onMouseLeave={onMouseLeaveHandler}
    >
      <div className={styles.header}>
        {icon}
        <Typography variant="subtitle1" classes={{ subtitle1: styles.headerTitle }}>{errorText}</Typography>
      </div>
      <Typography classes={{ root: styles.body }}>{message}</Typography>
    </div >
  );

}

export default Notification;