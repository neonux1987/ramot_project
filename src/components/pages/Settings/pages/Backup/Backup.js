import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import settingsActions from '../../../../../redux/actions/settingsActions';
import { FormControlLabel, Checkbox, Box, Button, Typography, Divider, TextField } from '@material-ui/core';
import LoadingCircle from '../../../../common/LoadingCircle';
import styles from './Backup.module.css';
import { MuiPickersUtilsProvider, DateTimePicker, TimePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import heLocale from "date-fns/locale/he";
import { selectFolderDialog } from '../../../../../services/electronDialogsSvc';
import { notify, notificationTypes } from '../../../../Notifications/Notification';
import { playSound, soundTypes } from '../../../../../audioPlayer/audioPlayer';
import { Prompt } from 'react-router'

const localeMap = {
  he: heLocale
};

class Backup extends Component {

  dbBackupLocationInputRef = React.createRef();
  state = {
    settingsSaved: true
  }


  componentDidMount() {
    this.props.fetchSettings();
  }

  componentWillUnmount() {
  }

  onDbTimeChange = (name, value) => {
    const db_backup = { ...this.props.settings.settings.data.db_backup };
    //must convert it to string to ensure electron won't change it to different time zone
    db_backup.time = String(value);
    this.setState({ settingsSaved: false });
    this.props.updateSettings(name, db_backup);
  }

  onDbDayChange = (event) => {
    const db_backup = { ...this.props.settings.settings.data.db_backup };
    const { name, checked } = event.target;
    const keys = Object.keys(db_backup.days_of_week);

    if (name === "everything" && checked === true) {
      for (let i = 0; i < keys.length; i++) {
        db_backup.days_of_week[keys[i]] = true;
      }
    } else if (name === "everything" && checked === false) {
      const keys = Object.keys(db_backup.days_of_week);
      for (let i = 0; i < keys.length; i++) {
        db_backup.days_of_week[keys[i]] = false;
      }
    }
    else {
      db_backup.days_of_week = {
        ...db_backup.days_of_week,
        [name]: checked,//set the selected day
        ["everything"]: checked ? db_backup.days_of_week["everything"] : false
      };

      let fullDays = true;
      //iterate and find if all days are selected
      for (let i = 0; i < keys.length; i++) {
        if (!db_backup.days_of_week[keys[i]] && keys[i] !== "everything") {
          fullDays = false;
        }
      }
      //if all the days selected then select everything checkbox
      if (fullDays) {
        db_backup.days_of_week["everything"] = true
      }

    }
    this.setState({ settingsSaved: false });
    this.props.updateSettings("db_backup", db_backup);
  }

  saveSettings = (message, enableSound) => {
    const { db_backup } = this.props.settings.settings.data;
    //the init that it's not valid
    let valid = this.isDaysOfWeekValid(db_backup.days_of_week);
    //if the backup is active and noValid is true
    //based on the no days were selected
    if (!valid && db_backup.active) {
      //send the error to the notification center
      notify({
        isError: true,
        type: notificationTypes.validation,
        message: "חייב לבחור לפחות יום אחד."
      });
      playSound(soundTypes.error);
    } else {
      this.setState({ settingsSaved: true });
      this.props.saveSettings(this.props.settings.settings.data, message, enableSound);
    }
  }

  isDaysOfWeekValid = (days_of_week) => {
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

  dbSelectFolderHandler = () => {
    const options = {
      defaultPath: this.props.settings.settings.data.db_backup.path
    }
    selectFolderDialog(options, (fullPath) => {
      if (fullPath) {
        const db_backup = { ...this.props.settings.settings.data.db_backup };
        db_backup.path = fullPath[0];
        this.setState({ settingsSaved: false });
        this.props.updateSettings("db_backup", db_backup);
        //`ndts-frms-db-${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`
      }
    });
  }

  toggleDbBackupActivation = () => {
    const db_backup = { ...this.props.settings.settings.data.db_backup };

    db_backup.active = !db_backup.active;

    if (db_backup.active) {
      this.props.enableDbBackup(db_backup);
    } else {
      this.props.disableDbBackup(db_backup);
    }

  }

  render() {
    const {
      settings
    } = this.props.settings;
    if (settings.isFetching) {
      return <LoadingCircle loading={settings.isFetching} />
    }
    const {
      db_backup,
      reports_backup
    } = settings.data;

    let dbActiveButton = !db_backup.active ? <Button style={{ float: "left" }} onClick={this.toggleDbBackupActivation} variant="contained" color="primary">הפעל</Button> :
      <Button style={{ float: "left" }} onClick={this.toggleDbBackupActivation} variant="contained" color="secondary">השבת</Button>;

    let dbActiveText = db_backup.active ? <Typography variant="h5" className={styles.dbBackupStatus + " " + styles.dbBackupActive}>פעיל</Typography> :
      <Typography variant="h5" className={styles.dbBackupStatus + " " + styles.dbBackupDisabled}>מושבת</Typography>

    return (
      <MuiPickersUtilsProvider utils={DateFnsUtils} locale={localeMap["he"]}>
        <Fragment>

          <div className={styles.form} disabled>

            <div style={{ paddingBottom: "5px" }}>
              <Typography variant="h5" className={styles.dbBackupTitle}>
                גיבוי בסיס נתונים
            </Typography>
              {dbActiveText}
              {dbActiveButton}
            </div>

            <Divider className={styles.divider} />

            <div style={{ marginBottom: "30px" }}>
              <Typography variant="subtitle1">
                <Box fontWeight="600">
                  בחר שעה לביצוע הגיבוי:
                </Box>
              </Typography>

              <TimePicker
                clearable
                ampm={false}
                classes={{ root: styles.time }}
                value={db_backup.time}
                onChange={(event) => this.onDbTimeChange("db_backup", event)}
              />
            </div>

            <div style={{ marginBottom: "30px" }}>
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
                    onChange={this.onDbDayChange}
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
                    name="1"
                    checked={db_backup.days_of_week["1"]}
                    onChange={this.onDbDayChange}
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
                    name="2"
                    checked={db_backup.days_of_week["2"]}
                    onChange={this.onDbDayChange}
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
                    name="3"
                    checked={db_backup.days_of_week["3"]}
                    onChange={this.onDbDayChange}
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
                    name="4"
                    checked={db_backup.days_of_week["4"]}
                    onChange={this.onDbDayChange}
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
                    name="5"
                    checked={db_backup.days_of_week["5"]}
                    onChange={this.onDbDayChange}
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
                    name="6"
                    checked={db_backup.days_of_week["6"]}
                    onChange={this.onDbDayChange}
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
                    name="7"
                    checked={db_backup.days_of_week["7"]}
                    onChange={this.onDbDayChange}
                    value="checkedB"
                    color="primary"
                  />
                }
              />

            </div>

            <div style={{ marginBottom: "30px" }}>
              <Typography variant="subtitle1" style={{ marginBottom: "10px" }}>
                <Box fontWeight="600">
                  בחר מיקום לשמירת הגיבוי:
                </Box>
              </Typography>

              <input
                ref={this.dbBackupLocationInputRef}
                id="file" type="file"
                style={{ visibility: "hidden" }}
              />
              <Button variant="contained" color="primary" onClick={this.dbSelectFolderHandler}>בחר מיקום</Button>
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




            <Button className={styles.saveBtn} style={{}} name="submit" variant="contained" color="primary" onClick={this.saveSettings}>
              שמור
            </Button>
          </div>
          <Prompt when={this.settingsSaved} message="האם אתה בטוח שברצונך לצאת בלי לשמור הגדרות?" />
        </Fragment>
      </MuiPickersUtilsProvider>
    );
  }

}

const mapStateToProps = state => ({
  settings: state.settings
});

const mapDispatchToProps = dispatch => ({
  fetchSettings: () => dispatch(settingsActions.fetchSettings()),
  saveSettings: (data) => dispatch(settingsActions.saveSettings(data)),
  updateSettings: (key, data) => dispatch(settingsActions.updateSettings(key, data)),
  enableDbBackup: (data) => dispatch(settingsActions.enableDbBackup(data)),
  disableDbBackup: (data) => dispatch(settingsActions.disableDbBackup(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Backup);