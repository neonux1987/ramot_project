import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import settingsActions from '../../../../../redux/actions/settingsActions';
import { FormControlLabel, Checkbox, Box, Button, Typography, Divider, TextField } from '@material-ui/core';
import LoadingCircle from '../../../../common/LoadingCircle';
import styles from './Backup.module.css';
import { MuiPickersUtilsProvider, DateTimePicker, TimePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import heLocale from "date-fns/locale/he";
import saveToFileDialog from '../../../../../helpers/saveToFileDialog';
import { ioSvc } from '../../../../../services/ioSvc';

const localeMap = {
  he: heLocale
};

let options = {
  //Placeholder 3
  filters: [
    { name: 'sqlite', extensions: ['sqlite'] }
  ]
};

class Backup extends Component {

  state = {
    formInputs: {
      backup_datetime: "10:23"
    },
    dbBackupLocation: ""
  }

  dbBackupLocationInputRef = React.createRef();

  componentDidMount() {
    this.props.fetchSettings();
  }

  componentWillUnmount() {
  }

  onTimeChange = (name, value) => {

    const db_backup = { ...this.props.settings.settings.data.db_backup };
    db_backup.time = value;
    this.props.updateSettings(name, db_backup);
  }

  saveSettings = (event) => {
    const data = [...this.props.generalSettings.generalSettings.data];

    const params = {
      id: data[0].id,
      settings: {
        ...this.state.formInputs
      }
    };
    this.props.updateSettings(params, data);
  }

  parseFormInputs(formInputs) {
    const copyFormInputs = { ...formInputs };
    copyFormInputs.tax = Number.parseFloat(copyFormInputs.tax);
    return copyFormInputs;
  }

  saveToFileHandler = () => {
    //location od the backup database folder
    options.defaultPath = this.props.settings.settings.data[0].db_backup_location;
    saveToFileDialog("nds-frms-db-26-09-2019", options, (fullPath) => {
      if (fullPath) {
        ioSvc(fullPath);
      }
    });
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
    return (
      <MuiPickersUtilsProvider utils={DateFnsUtils} locale={localeMap["he"]}>
        <Fragment>

          <div className={styles.form}>

            <div style={{ paddingBottom: "5px" }}>
              <Typography variant="h5" className={styles.dbBackupTitle}>
                גיבוי בסיס נתונים
            </Typography>
              <Typography variant="h5" className={styles.dbBackupStatus}>
                פעיל
            </Typography>
              <Button style={{ float: "left" }} variant="contained" color="secondary">כבה</Button>
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
                onChange={(event) => this.props.onTimeChange("db_backup", event)}
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
                    checked={false}
                    onChange={() => { }}
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
                    checked={true}
                    onChange={() => { }}
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
                    checked={true}
                    onChange={() => { }}
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
                    checked={true}
                    onChange={() => { }}
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
                    checked={true}
                    onChange={() => { }}
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
                    checked={true}
                    onChange={() => { }}
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
                    checked={false}
                    onChange={() => { }}
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
                    checked={false}
                    onChange={() => { }}
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
                onChange={(event) => {
                  console.log(event.target.value);
                  //this.setState({ dbbackupLocation: event.target.value })
                }}
              />
              <Button variant="contained" color="primary" onClick={() => this.saveToFileHandler()}>בחר מיקום</Button>
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




            <Button className={styles.saveBtn} style={{}} name="submit" variant="contained" color="primary" onClick={(event) => this.saveSettings(event)}>
              שמור
            </Button>
          </div>
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
  saveSettings: (key, data) => dispatch(settingsActions.saveSettings()),
  onTimeChange: (key, data) => dispatch(settingsActions.onTimeChange(key, data))
});

export default connect(mapStateToProps, mapDispatchToProps)(Backup);