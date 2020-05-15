import React from 'react';
import SubtitleBoldTypography from "../../../../../../components/Typographies/SubtitleBoldTypography";
import { TextField, Button } from '@material-ui/core';
import styles from './BackupFolderSelector.module.css';

export default (props) => {

  const {
    path = "",
    onClick
  } = props;

  return (
    <div className={styles.container}>
      <SubtitleBoldTypography className={styles.subtitle}>
        המיקום שבו נשמרים הגיבויים:
        </SubtitleBoldTypography>

      <Button variant="contained" color="primary" onClick={onClick}>שנה מיקום</Button>
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

