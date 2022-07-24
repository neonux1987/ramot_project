import React from 'react';
import SubtitleBoldTypography from "../../../../../../components/Typographies/SubtitleBoldTypography";
import styles from './ManualBackupSelector.module.css';
import WhiteButton from '../../../../../../components/buttons/WhiteButton';

const ManualBackupSelector = (props) => {

  const {
    onClick
  } = props;

  return (
    <div className={styles.manualBackupWrapper}>
      <SubtitleBoldTypography className={styles.subtitle}>
        לייצוא בסיס הנתונים לקובץ לחץ
          </SubtitleBoldTypography>
      <WhiteButton margin="0 8px 0 0" onClick={onClick}>ייצא בסיס נתונים
      </WhiteButton>
    </div>
  );
}

export default ManualBackupSelector;