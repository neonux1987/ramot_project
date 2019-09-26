import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import generalSettingsActions from '../../../../../redux/actions/generalSettingsActions';
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
      backup_datetime: this.props.generalSettings.generalSettings.data[0].backup_datetime
    },
    dbBackupLocation: ""
  }

  dbBackupLocationInputRef = React.createRef();

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  formOnChange = (name, value) => {
    console.log(value);
    this.setState(() => {
      return {
        ...this.state,
        formInputs: {
          ...this.formInputs,
          [name]: value
        }
      }
    })
  }

  saveSettings = (event) => {
    const data = [...this.props.generalSettings.generalSettings.data];

    const params = {
      id: data[0].id,
      settings: {
        ...this.state.formInputs
      }
    };
    this.props.updateGeneralSettings(params, data);
  }

  parseFormInputs(formInputs) {
    const copyFormInputs = { ...formInputs };
    copyFormInputs.tax = Number.parseFloat(copyFormInputs.tax);
    return copyFormInputs;
  }

  saveToFileHandler = () => {
    //location od the backup database folder
    options.defaultPath = this.props.generalSettings.generalSettings.data[0].db_backup_location;
    saveToFileDialog("nds-frms-db-26-09-2019", options, (fullPath) => {
      if (fullPath) {
        ioSvc(fullPath);
      }
    });
  }

  render() {
    const {
      generalSettings
    } = this.props.generalSettings;
    if (generalSettings.isFetching) {
      return <LoadingCircle loading={generalSettings.isFetching} />
    }

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
                value={this.state.formInputs.backup_datetime}
                onChange={(event) => this.formOnChange("backup_datetime", event)}
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
                value={this.state.dbBackupLocation}
                id="file" type="file"
                style={{ visibility: "hidden" }}
                onChange={(event) => {
                  console.log(event.target.value);
                  this.setState({ dbbackupLocation: event.target.value })
                }}
              />
              <Button variant="contained" color="primary" onClick={() => this.saveToFileHandler()}>בחר מיקום</Button>
              <TextField
                id="outlined-bare"
                disabled
                classes={{ root: styles.dbFileTextFieldLocationWrapper }}
                value={this.state.dbBackupLocation}
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
  generalSettings: state.generalSettings
});

const mapDispatchToProps = dispatch => ({
  fetchGeneralSettings: () => dispatch(generalSettingsActions.fetchGeneralSettings()),
  receiveGeneralSettings: (data) => dispatch(generalSettingsActions.receiveGeneralSettings(data)),
  updateGeneralSettings: (payload, data) => dispatch(generalSettingsActions.updateGeneralSettings(payload, data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Backup);