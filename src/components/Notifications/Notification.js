import React from 'react';
import styles from './Notifications.module.css';
import { Typography } from '@material-ui/core';
import { ErrorOutline, NotificationImportant, Close } from '@material-ui/icons';
import Ee from 'event-emitter';

export const notificationTypes = {
  db: "תקלת בסיס נתונים",
  server: "תקלת שרת",
  validation: "תקלת אימות נתונים"
}

const emitter = new Ee();
export const notify = (notification) => {
  emitter.emit('notify', notification);
}

const INIT_REMOVE_TIME = 5000; //in miliseconds
const ON_LEAVE_REMOVE_TIME = 2000; //in miliseconds

class Notification extends React.Component {

  constructor(props) {
    super(props);
    emitter.on("notify", (notification) => {
      this.onShow(notification)
    });
  }

  state = {
    notification: {
      isError: false,
      message: ""
    },
    bottom: "-140px"
  }
  timeout = null;
  box = React.createRef();

  onShow(notification) {
    if (this.timeout) {
      clearTimeout(this.timeout);
      this.setState({ bottom: "-140px" }, () => {
        this.timeout = null;
        this.timeout = setTimeout(() => {
          this.showNotification(notification);
        }, 400);
      });
    } else {
      this.showNotification(notification);
    }
  }

  showNotification(notification) {
    this.setState({
      notification: notification,
      bottom: "30px"
    }, () => {
      this.timeout = setTimeout(() => {
        this.initNotification();
      }, INIT_REMOVE_TIME);
    });
  }

  onMouseEnterHandler = (event) => {
    if (this.timeout) {
      clearTimeout(this.timeout);
      this.timeout = null;
    }
  }

  onMouseLeaveHandler = (event) => {
    this.timeout = setTimeout(() => {
      //this.props.remove(this.props.id);
      this.initNotification();
    }, ON_LEAVE_REMOVE_TIME);
  }

  initNotification() {
    this.setState({
      bottom: "-140px"
    });
    window.getSelection().empty();
  }

  btnClick = () => {
    this.initNotification();
  }

  componentDidMount() {
    this.setState({
      height: this.box.current.clientHeight
    })
  }

  render() {
    const { isError, message, type } = this.state.notification;
    const errorText = isError ? `שגיאה! ${type}` : "הודעה";
    const icon = isError ? <ErrorOutline style={{ color: "#ff0000" }} className={styles.icon} /> : <NotificationImportant style={{ color: "rgb(1, 167, 247)" }} className={styles.icon} />
    return (
      <div
        style={{ bottom: this.state.bottom }}
        className={styles.notificationBox}
        onMouseEnter={this.onMouseEnterHandler}
        onMouseLeave={this.onMouseLeaveHandler}
        ref={this.box}
      >
        {/* close button */}
        <button onClick={this.btnClick} className={styles.close}><Close classes={{ root: styles.closeIcon }} /></button>
        {/* icon */}
        <div className={styles.iconWrapper}>
          {icon}
        </div>
        {/* content */}
        <div className={styles.content}>
          <div className={styles.header}>
            <Typography variant="subtitle1" classes={{ subtitle1: styles.headerTitle }}>{type}</Typography>
          </div>
          <Typography classes={{ root: styles.body }}>{message}</Typography>
        </div>
      </div >
    );
  }

}

export default Notification;