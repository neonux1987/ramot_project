import React from 'react';
import styles from './SavedNotification.module.css';
import Slide from '@material-ui/core/Slide';

export default ({ saved }) => {

  return (
    <Slide direction="up" in={saved} mountOnEnter unmountOnExit>
      <div className={styles.wrapper}>
        <div className={styles.content}>המידע נשמר בהצלחה!</div>
      </div>
    </Slide>
  );

}