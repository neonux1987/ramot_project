// LIBRARIES
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { Button, Divider } from '@material-ui/core';
import { toast } from 'react-toastify';
import { Prompt } from 'react-router';
import DateFnsUtils from '@date-io/date-fns';
import heLocale from "date-fns/locale/he";

// ELECTRON
import { ipcRenderer } from 'electron';

// ACTIONS
import * as settingsActions from '../../../../redux/actions/settingsActions';
import backupsNamesActions from '../../../../redux/actions/backupsNamesActions';
import * as modalActions from '../../../../redux/actions/modalActions';

// COMPONENTS
import LoadingCircle from '../../../../components/LoadingCircle';
import styles from './BackupAndRestore.module.css';

// SERVICES
import { selectFolderDialog, saveToFileDialog } from '../../../../services/electronDialogs.svc';

// UTILS
import { playSound, soundTypes } from '../../../../audioPlayer/audioPlayer';

// CONTAINERS
import Backup from './Backup/Backup';
import Restore from './Restore/Restore';
import ConfirmDbPathChangeModel from '../../../../components/modals/ConfirmDbPathChangeModel/ConfirmDbPathChangeModel';


const localeMap = {
  he: heLocale
};


class BackupAndRestore extends Component {

  dbBackupLocationInputRef = React.createRef();
  state = {
    settingsSaved: true
  }


  componentDidMount() {
    this.props.fetchSettings();
    this.props.fetchBackupsNames();
    ipcRenderer.on("settings-updated", (event, type, settings) => {
      this.props.updateBackupSettings("last_update", settings.db_backup.last_update);
    });
  }

  componentWillUnmount() {
  }

  onDbTimeChange = (name, value) => {
    const db_backup = { ...this.props.settings.settings.data.db_backup };

    //must convert it to string to ensure electron won't change it to different time zone
    let date = new Date(value);
    const localeString = date.toLocaleString();
    date = new Date(localeString);

    db_backup.time = date.toString();

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
      toast.error("חייב לבחור לפחות יום אחד.", {
        onOpen: () => playSound(soundTypes.error)
      });
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
    selectFolderDialog(options).then(({ canceled, filePaths }) => {
      if (!canceled) {
        const db_backup = { ...this.props.settings.settings.data.db_backup };

        if (db_backup.path !== filePaths[0]) {
          this.props.showModal(ConfirmDbPathChangeModel, {
            onAgreeHandler: () => {
              db_backup.path = filePaths[0];
              this.setState({ settingsSaved: false });
              this.props.initializeBackupNames();
              this.props.updateSettings("db_backup", db_backup);
            }
          });
        }


      }
    });


  }

  dbIndependentBackup = () => {

    const currentDate = new Date();

    const fileName = `mezach-db-backup-${currentDate.getDay()}-${currentDate.getDate()}-${currentDate.getFullYear()}.sqlite`;

    saveToFileDialog(fileName, undefined).then(({ canceled, filePath }) => {
      if (!canceled) {
        this.props.dbIndependentBackup(filePath);
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

  backupsToSaveChangeHandler = (event) => {
    const { value } = event.target;
    const db_backup = { ...this.props.settings.settings.data.db_backup };
    db_backup.backups_to_save = value;
    this.props.updateSettings("db_backup", db_backup);
  }

  render() {
    const {
      settings
    } = this.props.settings;

    const {
      backupsNames
    } = this.props.backupsNames;

    if (settings.isFetching || backupsNames.isFetching) {
      return <LoadingCircle loading={settings.isFetching || backupsNames.isFetching} />
    }

    return (
      <MuiPickersUtilsProvider utils={DateFnsUtils} locale={localeMap["he"]}>
        <Fragment>

          <div className={styles.form} disabled>

            <Backup
              db_backup={settings.data.db_backup}
              toggleDbBackupActivation={this.toggleDbBackupActivation}
              backupsToSaveChangeHandler={this.backupsToSaveChangeHandler}
              onDbTimeChange={this.onDbTimeChange}
              onDbDayChange={this.onDbDayChange}
              dbSelectFolderHandler={this.dbSelectFolderHandler}
              dbIndependentBackup={this.dbIndependentBackup}
            />

            <Restore
              backupsNames={this.props.backupsNames.backupsNames}
            />

            <Divider className={styles.divider} />

            <Button className={styles.saveBtn} style={{ margin: "80px 0" }} name="submit" variant="contained" color="primary" onClick={this.saveSettings}>
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
  settings: state.settings,
  backupsNames: state.backupsNames
});

const mapDispatchToProps = dispatch => ({
  fetchSettings: () => dispatch(settingsActions.fetchSettings()),
  saveSettings: (data) => dispatch(settingsActions.saveSettings(data)),
  updateSettings: (key, data) => dispatch(settingsActions.updateSettings(key, data)),
  enableDbBackup: (data) => dispatch(settingsActions.enableDbBackup(data)),
  disableDbBackup: (data) => dispatch(settingsActions.disableDbBackup(data)),
  dbIndependentBackup: (filePath) => dispatch(settingsActions.dbIndependentBackup(filePath)),
  updateBackupSettings: (key, data) => dispatch(settingsActions.updateBackupSettings(key, data)),
  fetchBackupsNames: () => dispatch(backupsNamesActions.fetchBackupsNames()),
  initializeBackupNames: () => dispatch(backupsNamesActions.initializeBackupNames()),
  showModal: (modelComponent, props) => dispatch(modalActions.showModal(modelComponent, props)),
});

export default connect(mapStateToProps, mapDispatchToProps)(BackupAndRestore);