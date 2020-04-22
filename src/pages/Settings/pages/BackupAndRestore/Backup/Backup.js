// LIBRARIES
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FormControlLabel, FormControl, InputLabel, Checkbox, Box, Button, Typography, Divider, TextField, Select, MenuItem } from '@material-ui/core';
import { MuiPickersUtilsProvider, TimePicker } from '@material-ui/pickers';
import { Backup } from '@material-ui/icons';
import DateFnsUtils from '@date-io/date-fns';
import heLocale from "date-fns/locale/he";
import { toast } from 'react-toastify';

// UTILS
import { playSound, soundTypes } from '../../../../../audioPlayer/audioPlayer';

// CSS
import styles from './Backup.module.css';

// COMPONENTS
import StyledExpandableSection from '../../../../../components/Section/StyledExpandableSection';
import SaveButton from '../../../../../components/SaveButton/SaveButton';
import LoadingCircle from '../../../../../components/LoadingCircle';
import ConfirmDbPathChangeModel from '../../../../../components/modals/ConfirmDbPathChangeModel/ConfirmDbPathChangeModel';

// SERVICES
import { selectFolderDialog, saveToFileDialog } from '../../../../../services/electronDialogs.svc';

// ACTIONS
import {
  saveSettings,
  updateSettings,
  fetchSettings,
  cleanup
} from '../../../../../redux/actions/settingsActions';
import {
  initializeBackupNames
} from '../../../../../redux/actions/backupsNamesActions';
import { showModal } from '../../../../../redux/actions/modalActions';
import { dbIndependentBackup } from '../../../../../redux/actions/dbBackupActions';


const SETTINGS_NAME = "db_backup";

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

  const save = async (event) => {
    event.stopPropagation();

    //the init that it's not valid
    let valid = isDaysOfWeekValid(data.days_of_week);
    //if the backup is active and noValid is true
    //based on the no days were selected
    if (!valid && data.active) {
      //send the error to the notification center
      toast.error("חייב לבחור לפחות יום אחד.", {
        onOpen: () => playSound(soundTypes.error)
      });
    } else {
      const dataCopy = { ...data };
      dataCopy.restartRequired = true;

      dispatch(updateSettings(SETTINGS_NAME, dataCopy))
      dispatch(saveSettings(SETTINGS_NAME, dataCopy));
    }
  }

  const cleanupStore = () => {
    dispatch(cleanup(SETTINGS_NAME, data));
  }

  // validation
  const isDaysOfWeekValid = (days_of_week) => {
    //get the keys of the object
    const keys = Object.keys(days_of_week);
    //the init that it's not valid
    let notValid = true;
    //if at least on of the days
    //is checked, then it's valid and notValid should be false
    for (let i = 0; i < keys.length; i++) {
      if (days_of_week[keys[i]]) {
        notValid = false;
      }
    }
    //if the backup is active and noValid is true
    //based on the no days were selected
    if (notValid) {
      return false;
    } else {
      return true;
    }
  }

  if (isFetching) {
    return <LoadingCircle loading={isFetching} />
  }

  const onDbTimeChange = (value) => {
    //must convert it to string to ensure electron won't change it to different time zone
    let date = new Date(value);
    const localeString = date.toLocaleString();
    date = new Date(localeString);

    data.time = date.toString();

    dispatch(updateSettings(SETTINGS_NAME, data));
  }

  const onDbDayChange = (event) => {
    const { name, checked } = event.target;
    const keys = Object.keys(data.days_of_week);

    if (name === "everything" && checked === true) {
      for (let i = 0; i < keys.length; i++) {
        data.days_of_week[keys[i]] = true;
      }
    } else if (name === "everything" && checked === false) {
      const keys = Object.keys(data.days_of_week);
      for (let i = 0; i < keys.length; i++) {
        data.days_of_week[keys[i]] = false;
      }
    }
    else {
      data.days_of_week = {
        ...data.days_of_week,
        [name]: checked,//set the selected day
        ["everything"]: checked ? data.days_of_week["everything"] : false
      };

      let fullDays = true;
      //iterate and find if all days are selected
      for (let i = 0; i < keys.length; i++) {
        if (!data.days_of_week[keys[i]] && keys[i] !== "everything") {
          fullDays = false;
        }
      }
      //if all the days selected then select everything checkbox
      if (fullDays) {
        data.days_of_week["everything"] = true
      }

    }
    dispatch(updateSettings(SETTINGS_NAME, data));
  }

  const backupsToSaveChangeHandler = (event) => {
    const { value } = event.target;
    data.backups_to_save = value;
    dispatch(updateSettings(SETTINGS_NAME, data));
  }

  const dbSelectFolderHandler = () => {
    const options = {
      defaultPath: data.path
    }
    selectFolderDialog(options).then(({ canceled, filePaths }) => {
      if (!canceled) {
        if (data.path !== filePaths[0]) {
          dispatch(
            showModal(ConfirmDbPathChangeModel, {
              onAgreeHandler: () => {
                data.path = filePaths[0];
                dispatch(initializeBackupNames());
                dispatch(updateSettings(SETTINGS_NAME, data));
              }
            }) // end show modal
          ); // end dispatch
        } // end if
      } // end if
    }); //end selectFolderDialog
  }

  const dbIndependentBackupHandler = () => {

    const currentDate = new Date();

    const fileName = `mezach-db-backup-${currentDate.getDay()}-${currentDate.getDate()}-${currentDate.getFullYear()}.sqlite`;

    saveToFileDialog(fileName, undefined).then(({ canceled, filePath }) => {
      if (!canceled) {
        dispatch(dbIndependentBackup(filePath));
      }
    });

  }

  //to render the last update of the backup
  const BackupDateTime = new Date(data.last_update);
  const backupDateRender = `${BackupDateTime.getDate()}/${BackupDateTime.getMonth() + 1}/${BackupDateTime.getFullYear()}`;
  const backupTimeRender = `${BackupDateTime.getHours()}:${BackupDateTime.getMinutes()}`;

  let backups_to_save = [];
  for (let i = 1; i <= data.max_num_of_history_backups; i++) {
    backups_to_save.push(<MenuItem value={i} key={i}>{i}</MenuItem>)
  }

  return (
    <StyledExpandableSection
      title={"גיבוי בסיס נתונים"}
      TitleIcon={Backup}
      iconBoxBg={"#1b966e"}
      extraDetails={() =>
        <SaveButton onClick={save}>שמור</SaveButton>
      }
      padding={"30px 20px"}
    >{/* db backup start */}

      {/* <Typography className={styles.dbLastUpdate} variant="subtitle1">{`גיבוי אחרון בוצע בתאריך ${backupDateRender} ובשעה ${backupTimeRender}`}</Typography> */}

      {data.enabled && data.restartRequired && <Typography className={styles.restartRequired} variant="subtitle1">
        {"*לאחר ביצוע שינויים נדרש לאתחל את השירות בלשונית שירותי מערכת."}
      </Typography>}

      <div style={{ marginBottom: "40px" }}>

        <Typography variant="subtitle1">
          <Box fontWeight="600">
            בחר שעה לביצוע הגיבוי:
        </Box>
        </Typography>

        <TimePicker
          ampm={false}
          classes={{ root: styles.time }}
          value={data.time}
          onChange={onDbTimeChange}
        />
      </div>

      <div style={{ marginBottom: "40px" }}>
        <Typography variant="subtitle1">
          <Box fontWeight="600">
            בחר כמה גיבויים לשמור לאחור:
        </Box>
        </Typography>

        <Select
          value={data.backups_to_save}
          onChange={backupsToSaveChangeHandler}
          inputProps={{
            name: 'age',
            id: 'age-simple',
          }}
        >
          {backups_to_save}
        </Select>
      </div>



      <div style={{ marginBottom: "40px" }}>
        <Typography variant="subtitle1" style={{ marginBottom: "20px" }}>
          <Box fontWeight="600">
            בחר באיזה ימים הנך מעוניין שהגיבוי יתבצע:
        </Box>
        </Typography>

        <FormControlLabel
          labelPlacement="top"
          label="הכל"
          style={{ marginRight: "-8px", borderLeft: "1px solid #808080", paddingLeft: "25px" }}
          control={
            <Checkbox
              name="everything"
              checked={data.days_of_week["everything"]}
              onChange={onDbDayChange}
              value="checkedB"
              color="primary"
            />
          }
        />

        <FormControlLabel
          labelPlacement="top"
          label="יום א'"
          control={
            <Checkbox
              name="0"
              checked={data.days_of_week["0"]}
              onChange={onDbDayChange}
              value="checkedB"
              color="primary"
            />
          }
        />

        <FormControlLabel
          labelPlacement="top"
          label="יום ב'"
          control={
            <Checkbox
              name="1"
              checked={data.days_of_week["1"]}
              onChange={onDbDayChange}
              value="checkedB"
              color="primary"
            />
          }
        />

        <FormControlLabel
          labelPlacement="top"
          label="יום ג'"
          control={
            <Checkbox
              name="2"
              checked={data.days_of_week["2"]}
              onChange={onDbDayChange}
              value="checkedB"
              color="primary"
            />
          }
        />

        <FormControlLabel
          labelPlacement="top"
          label="יום ד'"
          control={
            <Checkbox
              name="3"
              checked={data.days_of_week["3"]}
              onChange={onDbDayChange}
              value="checkedB"
              color="primary"
            />
          }
        />

        <FormControlLabel
          labelPlacement="top"
          label="יום ה'"
          control={
            <Checkbox
              name="4"
              checked={data.days_of_week["4"]}
              onChange={onDbDayChange}
              value="checkedB"
              color="primary"
            />
          }
        />

        <FormControlLabel
          labelPlacement="top"
          label="יום ו'"
          control={
            <Checkbox
              name="5"
              checked={data.days_of_week["5"]}
              onChange={onDbDayChange}
              value="checkedB"
              color="primary"
            />
          }
        />

        <FormControlLabel
          labelPlacement="top"
          label="יום ש'"
          control={
            <Checkbox
              name="6"
              checked={data.days_of_week["6"]}
              onChange={onDbDayChange}
              value="checkedB"
              color="primary"
            />
          }
        />

      </div>

      <div style={{ marginBottom: "40px" }}>
        <Typography variant="subtitle1" style={{ marginBottom: "10px" }}>
          <Box fontWeight="600">
            בחר מיקום לשמירת הגיבוי:
        </Box>
        </Typography>

        <Button variant="contained" color="primary" onClick={dbSelectFolderHandler}>שנה מיקום</Button>
        <TextField
          id="outlined-bare"
          disabled
          classes={{ root: styles.dbFileTextFieldLocationWrapper }}
          value={data.path}
          onChange={() => { }}
          variant="outlined"
          inputProps={{ 'aria-label': 'bare', className: styles.dbFileTextFieldLocationInput }}
        />
      </div>

      <div style={{ marginBottom: "40px" }}>
        <Typography variant="subtitle1" style={{ display: "inline-flex" }}>
          <Box fontWeight="600">לגיבוי ידני ושמירת הגיבוי במקום אחר לחץ</Box>
        </Typography>
        <Button style={{ marginRight: "10px", display: "inline-flex" }} variant="contained" color="primary" onClick={dbIndependentBackupHandler}>גבה בסיס נתונים</Button>
      </div>

      {/* db backup end */}</StyledExpandableSection >
  );
}