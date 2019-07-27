import React from 'react';
import styles from './Notifications.module.css';
import { Typography } from '@material-ui/core';
import { ErrorOutline, Info } from '@material-ui/icons';

class Notification extends React.Component {

  constructor(props) {
    super(props);
    this.timer = null;
  }

  state = {
    id: this.props.id
  };

  /* let timer = setTimeout(() => {
    remove(id);
  }, 5000); */

  onMouseEnterHandler = (event) => {
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
  }

  onMouseLeaveHandler = (event) => {
    this.timer = setTimeout(() => {
      this.props.remove(this.props.id);
    }, 2000);
  }

  componentDidMount() {
    this.timer = setTimeout(() => {
      this.props.remove(this.props.id);
    }, 5000);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.id !== this.state.id;
  }

  render() {
    const { isError = false, message = "" } = this.props;
    const errorText = isError ? `שגיאה מס' ${this.props.id}` : "הודעה";
    const icon = isError ? <ErrorOutline className={styles.headerIconError} /> : <Info className={styles.headerIconInfo} />
    return (
      <div
        className={styles.notificationBox}
        onMouseEnter={this.onMouseEnterHandler}
        onMouseLeave={this.onMouseLeaveHandler}
      >
        <div className={styles.header}>
          {icon}
          <Typography variant="subtitle1" classes={{ subtitle1: styles.headerTitle }}>{errorText}</Typography>
        </div>
        <Typography classes={{ root: styles.body }}>{message}</Typography>
      </div >
    );
  }

}

export default Notification;