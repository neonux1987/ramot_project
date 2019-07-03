import React from 'react';
import styles from './Notifications.module.css';
import Notification from './Notification';

const NotificationWrapper = ({ notifications }, props) => {

  return (
    <div className={styles.wrapper} style={{ display: notifications.length > 0 ? "block" : "none" }}>
      {
        notifications.map((notification, index) => {
          return <Notification isVisible={notification.isVisible} isError={notification.isError} message={notification.message} key={index} />
        })
      }
    </div >
  );

}

export default NotificationWrapper;