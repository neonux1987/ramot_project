import React from 'react';
import SubtitleBoldTypography from "../../../../../../components/Typographies/SubtitleBoldTypography";
import styles from './ManualBackupSelector.module.css';
import PrimaryButton from '../../../../../../components/Buttons/PrimaryButton';

export default (props) => {

  const {
    onClick
  } = props;

  return (
    <div className={styles.manualBackupWrapper}>
      <SubtitleBoldTypography className={styles.subtitle}>
        ניתן לייצא את בסיס הנתונים לקובץ ולשמור אותו במחשב
          </SubtitleBoldTypography>
      <PrimaryButton
        className={styles.backupButton}
        onClick={onClick}
      >ייצא בסיס נתונים
      </PrimaryButton>
    </div>
  );
}

