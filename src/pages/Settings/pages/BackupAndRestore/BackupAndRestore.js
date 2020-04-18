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


  dbIndependentBackup = () => {

    const currentDate = new Date();

    const fileName = `mezach-db-backup-${currentDate.getDay()}-${currentDate.getDate()}-${currentDate.getFullYear()}.sqlite`;

    saveToFileDialog(fileName, undefined).then(({ canceled, filePath }) => {
      if (!canceled) {
        this.props.dbIndependentBackup(filePath);
      }
    });

  }

  backupsToSaveChangeHandler = (event) => {
    const { value } = event.target;
    const db_backup = { ...this.props.settings.data.db_backup };
    db_backup.backups_to_save = value;
    this.props.updateSettings("db_backup", db_backup);
  }

  render() {
    return (
      <MuiPickersUtilsProvider utils={DateFnsUtils} locale={localeMap["he"]}>
        <Fragment>

          <div className={styles.form} disabled>

            <Backup
              toggleDbBackupActivation={this.toggleDbBackupActivation}
              backupsToSaveChangeHandler={this.backupsToSaveChangeHandler}
              onDbTimeChange={this.onDbTimeChange}
              onDbDayChange={this.onDbDayChange}
              dbSelectFolderHandler={this.dbSelectFolderHandler}
              dbIndependentBackup={this.dbIndependentBackup}
            />

            <Restore />

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
  dbIndependentBackup: (filePath) => dispatch(settingsActions.dbIndependentBackup(filePath)),
  showModal: (modelComponent, props) => dispatch(modalActions.showModal(modelComponent, props)),
});

export default connect(mapStateToProps, mapDispatchToProps)(BackupAndRestore);