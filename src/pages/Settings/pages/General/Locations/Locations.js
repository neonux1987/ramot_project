// LIBRARIES
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FormControlLabel, FormControl, InputLabel, Checkbox, Box, Button, Typography, Divider, TextField, Select, MenuItem } from '@material-ui/core';
import { MuiPickersUtilsProvider, TimePicker } from '@material-ui/pickers';
import { Backup } from '@material-ui/icons';
import { toast } from 'react-toastify';

// UTILS
import { playSound, soundTypes } from '../../../../../audioPlayer/audioPlayer';

// CSS
import styles from './Locations.module.css';

// COMPONENTS
import StyledExpandableSection from '../../../../../components/Section/StyledExpandableSection';
import SaveButton from '../../../../../components/SaveButton/SaveButton';
import LoadingCircle from '../../../../../components/LoadingCircle';
import ConfirmDbPathChangeModel from '../../../../../components/modals/ConfirmDbPathChangeModel/ConfirmDbPathChangeModel';

// SERVICES
import { selectFolderDialog } from '../../../../../services/electronDialogs.svc';

// ACTIONS
import {
  fetchSettings,
  updateSettings,
  saveSettings,
  cleanup
} from '../../../../../redux/actions/settingsActions';

const { shell } = require('electron');

const SETTINGS_NAME = "locations";

export default (props) => {

  const dispatch = useDispatch();

  // state
  const settings = useSelector(store => store.settings[SETTINGS_NAME]);

  const {
    isFetching,
    data
  } = settings;

  useEffect(() => {
    dispatch(fetchSettings(SETTINGS_NAME));
    return cleanupStore;
  }, [dispatch, cleanupStore]);

  const cleanupStore = () => {
    dispatch(cleanup(SETTINGS_NAME, data));
  }

  if (isFetching) {
    return <LoadingCircle loading={isFetching} />
  }

  const {
    db_file_path,
    reports_folder_path,
    config_folder_path,
    config_file_path,
    db_backups_folder_path
  } = data;

  const save = (event) => {
    event.stopPropagation();

    dispatch(saveSettings(SETTINGS_NAME, data));
  }

  const dbSelectFolderHandler = (name, path) => {
    const options = {
      defaultPath: path
    }
    selectFolderDialog(options).then(({ canceled, filePaths }) => {
      if (!canceled) {
        if (path !== filePaths[0]) {
          const dataCopy = { ...data };
          dataCopy[name] = filePaths[0];
          dispatch(updateSettings(SETTINGS_NAME, dataCopy));
        } // end if
      } // end if
    }); //end selectFolderDialog
  }
  const openFileInFolder = (path) => {
    shell.showItemInFolder(path);
  }

  return (
    <StyledExpandableSection
      title={"מיקום קבצי מערכת"}
      TitleIcon={Backup}
      iconBoxBg={"#1b966e"}
      extraDetails={() =>
        <SaveButton onClick={save}>שמור</SaveButton>
      }
      padding={"30px 20px"}
    >

      <form className={styles.form} onChange={(event) => this.formOnChange(event)} onSubmit={(event) => event.preventDefault()}>

        <Typography variant="subtitle1">
          <Box fontWeight="600">
            מיקום תיקיית ייצוא דוחות
          </Box>
        </Typography>

        <Typography variant="subtitle2" className={styles.headerTitle}>
          מיקום התיקייה שאליה המערכת מייצאה את דוחות האקסל.
          אם ברצונך לשנות מיקום זה, לחץ על שנה מיקום.
        </Typography>

        <Button variant="contained" color="primary" onClick={() => dbSelectFolderHandler("reports_folder_path", reports_folder_path)}>שנה מיקום</Button>
        <TextField
          id="outlined-bare"
          disabled
          classes={{ root: styles.dbFileTextFieldLocationWrapper }}
          value={reports_folder_path}
          onChange={() => { }}
          variant="outlined"
          inputProps={{ 'aria-label': 'bare', className: styles.dbFileTextFieldLocationInput }}
        />

        <Divider className={styles.divider} />

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

        <Button variant="contained" color="primary" onClick={() => dbSelectFolderHandler("db_backups_folder_path", db_backups_folder_path)}>שנה מיקום</Button>
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