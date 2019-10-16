import React from 'react';
import { FormControlLabel, FormControl, InputLabel, Checkbox, Box, Button, Typography, Divider, TextField, Select, MenuItem } from '@material-ui/core';
import { MuiPickersUtilsProvider, TimePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import heLocale from "date-fns/locale/he";
import styles from './Backup.module.css';

export default (props) => {

  const { db_backup } = props;

  //to render the last update of the backup
  const BackupDateTime = new Date(db_backup.last_update);
  const backupDateRender = `${BackupDateTime.getDate()}/${BackupDateTime.getMonth() + 1}/${BackupDateTime.getFullYear()}`;
  const backupTimeRender = `${BackupDateTime.getHours()}:${BackupDateTime.getMinutes()}`;

  let dbActiveButton = !db_backup.active ? <Button style={{ float: "left" }} onClick={props.toggleDbBackupActivation} variant="contained" color="primary">הפעל</Button> :
    <Button style={{ float: "left" }} onClick={props.toggleDbBackupActivation} variant="contained" color="secondary">השבת</Button>;

  let dbActiveText = db_backup.active ? <Typography variant="h5" className={styles.dbBackupStatus + " " + styles.dbBackupActive}>פעיל</Typography> :
    <Typography variant="h5" className={styles.dbBackupStatus + " " + styles.dbBackupDisabled}>מושבת</Typography>


  let backups_to_save = [];
  for (let i = 1; i <= db_backup.max_num_of_histor_backups; i++) {
    backups_to_save.push(<MenuItem value={i} key={i}>{i}</MenuItem>)
  }

  return (

    < div >{/* db backup start */}
      <div style={{ paddingBottom: "0px", fontSize: "28px" }}>
        <Typography variant="h5" className={styles.dbBackupTitle}>
          גיבוי בסיס נתונים
    </Typography>
        {dbActiveText}
        {dbActiveButton}
      </div>

      <Divider className={styles.divider} />

      <Typography className={styles.dbLastUpdate} variant="subtitle1">{`גיבוי אחרון בוצע בתאריך ${backupDateRender} ובשעה ${backupTimeRender}`}</Typography>

      <div style={{ marginBottom: "40px" }}>
        <Typography variant="subtitle1">
          <Box fontWeight="600">
            בחר שעה לביצוע הגיבוי:
        </Box>
        </Typography>

        <TimePicker
          ampm={false}
          classes={{ root: styles.time }}
          value={db_backup.time}
          onChange={(event) => props.onDbTimeChange("db_backup", event)}
        />
      </div>

      <div style={{ marginBottom: "40px" }}>
        <Typography variant="subtitle1">
          <Box fontWeight="600">
            בחר כמה גיבויים לשמור לאחור:
        </Box>
        </Typography>

        <Select
          value={db_backup.backups_to_save}
          onChange={props.backupsToSaveChangeHandler}
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
              checked={db_backup.days_of_week["everything"]}
              onChange={props.onDbDayChange}
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
              checked={db_backup.days_of_week["0"]}
              onChange={props.onDbDayChange}
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
              checked={db_backup.days_of_week["1"]}
              onChange={props.onDbDayChange}
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
              checked={db_backup.days_of_week["2"]}
              onChange={props.onDbDayChange}
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
              checked={db_backup.days_of_week["3"]}
              onChange={props.onDbDayChange}
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
              checked={db_backup.days_of_week["4"]}
              onChange={props.onDbDayChange}
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
              checked={db_backup.days_of_week["5"]}
              onChange={props.onDbDayChange}
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
              checked={db_backup.days_of_week["6"]}
              onChange={props.onDbDayChange}
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

        <Button variant="contained" color="primary" onClick={props.dbSelectFolderHandler}>בחר מיקום</Button>
        <TextField
          id="outlined-bare"
          disabled
          classes={{ root: styles.dbFileTextFieldLocationWrapper }}
          value={db_backup.path}
          onChange={() => { }}
          variant="outlined"
          inputProps={{ 'aria-label': 'bare', className: styles.dbFileTextFieldLocationInput }}
        />
      </div>

      <div style={{ marginBottom: "40px" }}>
        <Typography variant="subtitle1" style={{ display: "inline-flex" }}>
          <Box fontWeight="600">לגיבוי ידני ושמירת הגיבוי במקום אחר לחץ</Box>
        </Typography>
        <Button style={{ marginRight: "10px", display: "inline-flex" }} variant="contained" color="primary" onClick={props.dbIndependentBackup}>גבה בסיס נתונים</Button>
      </div>

      {/* db backup end */}</div >
  );
}