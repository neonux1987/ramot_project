// LIBRARIES
import React from 'react';
import { Box, Button, Typography, Divider, TextField } from '@material-ui/core';
import { Backup } from '@material-ui/icons';

// CSS
import styles from './SystemLocations.module.css';

// COMPONENTS
import StyledExpandableSection from '../../../../../components/Section/StyledExpandableSection';
import SaveButton from '../../../../../components/SaveButton/SaveButton';

export default (props) => {

  const {
    data,
    openFileInFolder,
    selectHandler,
    saveHandler
  } = props;

  const {
    db_file_path,
    config_folder_path,
    config_file_path,
    db_backups_folder_path
  } = data;

  return (
    <StyledExpandableSection
      title={"מיקום קבצי מערכת"}
      TitleIcon={Backup}
      iconColor={"#0365a2"}
      extraDetails={() =>
        <SaveButton onClick={saveHandler}>שמור</SaveButton>
      }
      padding={"30px 20px"}
    >

      <form className={styles.form} onChange={(event) => this.formOnChange(event)} onSubmit={(event) => event.preventDefault()}>

        <Typography variant="subtitle1">
          <Box fontWeight="600">
            מיקום בסיס הנתונים
          </Box>
        </Typography>

        <Typography variant="subtitle2" className={styles.headerTitle}>
          מיקום התיקיה שבה נמצא בסיס הנתונים שבשימוש המערכת. (לא ניתן לשנות את המיקום שלו)
        </Typography>

        <Button variant="contained" color="primary" onClick={() => openFileInFolder(db_file_path)}>פתח מיקום</Button>
        <TextField
          id="outlined-bare"
          disabled
          classes={{ root: styles.dbFileTextFieldLocationWrapper }}
          value={db_file_path}
          onChange={() => { }}
          variant="outlined"
          inputProps={{ 'aria-label': 'bare', className: styles.dbFileTextFieldLocationInput }}
        />

        <Divider className={styles.divider} />

        <Typography variant="subtitle1" className={styles.headerTitle}>
          <Box fontWeight="600">
            מיקום קבצי הגדרות
          </Box>
        </Typography>

        <Button variant="contained" color="primary" onClick={() => openFileInFolder(config_file_path)}>פתח מיקום</Button>
        <TextField
          id="outlined-bare"
          disabled
          classes={{ root: styles.dbFileTextFieldLocationWrapper }}
          value={config_folder_path}
          onChange={() => { }}
          variant="outlined"
          inputProps={{ 'aria-label': 'bare', className: styles.dbFileTextFieldLocationInput }}
        />

        <Divider className={styles.divider} />

        <Typography variant="subtitle1">
          <Box fontWeight="600">
            מיקום גיבויים
        </Box>
        </Typography>

        <Typography variant="subtitle2" className={styles.headerTitle}>
          מיקום התיקייה שבה יישמרו הגיבויים של בסיס הנתונים.
        </Typography>

        <Button variant="contained" color="primary" onClick={() => selectHandler("db_backups_folder_path", db_backups_folder_path)}>שנה מיקום</Button>
        <TextField
          id="outlined-bare"
          disabled
          classes={{ root: styles.dbFileTextFieldLocationWrapper }}
          value={db_backups_folder_path}
          onChange={() => { }}
          variant="outlined"
          inputProps={{ 'aria-label': 'bare', className: styles.dbFileTextFieldLocationInput }}
        />

      </form>

    </StyledExpandableSection >
  );
}