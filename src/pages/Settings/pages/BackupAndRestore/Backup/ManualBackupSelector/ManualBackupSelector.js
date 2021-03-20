import React from 'react';
import SubtitleBoldTypography from "../../../../../../components/Typographies/SubtitleBoldTypography";
import styles from './ManualBackupSelector.module.css';
import PrimaryButton from '../../../../../../components/buttons/PrimaryButton';

const ManualBackupSelector = (props) => {

  const {
    onClick
  } = props;

  return (
    <div className={styles.manualBackupWrapper}>
      <SubtitleBoldTypography className={styles.subtitle}>
        לייצוא בסיס הנתונים לקובץ לחץ
          </SubtitleBoldTypography>
      <PrimaryButton
        className={styles.backupButton}
        onClick={onClick}
      >ייצא בסיס נתונים
      </PrimaryButton>
    </div>
  );
}

export default ManualBackupSelector;