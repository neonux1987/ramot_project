import React from 'react';
import SubtitleBoldTypography from "../../../../../../components/Typographies/SubtitleBoldTypography";
import { Button } from '@material-ui/core';
import styles from './ManualBackupSelector.module.css';

export default (props) => {

  const {
    onClick
  } = props;

  return (
    <div className={styles.manualBackupWrapper}>
      <SubtitleBoldTypography className={styles.subtitle}>
        ניתן לייצא את בסיס הנתונים לקובץ ולשמור אותו במחשב
          </SubtitleBoldTypography>
      <Button
        className={styles.backupButton}
        variant="contained" color="primary"
        onClick={onClick}
      >ייצא בסיס נתונים
      </Button>
    </div>
  );
}

