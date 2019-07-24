import React from 'react';
import styles from './Notifications.module.css';

const NotificationWrapper = ({ display, ...props }) => {
  return (
    <div className={styles.wrapper} style={{ display: display ? "block" : "none" }}>
      {props.children}
    </div >
  );
}

export default NotificationWrapper;