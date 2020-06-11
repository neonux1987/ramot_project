import React from 'react';
import SubtitleBoldTypography from "../../../../../../components/Typographies/SubtitleBoldTypography";
import { TextField } from '@material-ui/core';
import styles from './BackupFolderSelector.module.css';
import PrimaryButton from '../../../../../../components/Buttons/PrimaryButton';

export default (props) => {

  const {
    path = "",
    onClick
  } = props;

  return (
    <div className={styles.container}>
      <SubtitleBoldTypography className={styles.subtitle}>
        מיקום תיקיית הגיבויים:
        </SubtitleBoldTypography>

      <PrimaryButton onClick={onClick}>שנה מיקום</PrimaryButton>
      <TextField
        id="outlined-bare"
        disabled
        classes={{ root: styles.dbFileTextFieldLocationWrapper }}
        value={path}
        onChange={() => { }}
        variant="outlined"
        inputProps={{ 'aria-label': 'bare', className: styles.dbFileTextFieldLocationInput }}
      />
    </div>
  );
}

