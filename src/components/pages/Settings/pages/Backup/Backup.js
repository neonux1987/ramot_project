import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import generalSettingsActions from '../../../../../redux/actions/generalSettingsActions';
import { TextField, Button,Typography } from '@material-ui/core';
import LoadingCircle from '../../../../common/LoadingCircle';
import styles from './Backup.module.css';
import { MuiPickersUtilsProvider, DateTimePicker,TimePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

class Backup extends Component {

  state = {
    formInputs: {
      backup_datetime: this.props.generalSettings.generalSettings.data[0].backup_datetime
    }
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  formOnChange = (name,value) => {
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

  render() {
    const {
      generalSettings
    } = this.props.generalSettings;
    if (generalSettings.isFetching) {
      return <LoadingCircle loading={generalSettings.isFetching} />
    }

    return (
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Fragment>

        <form className={styles.form}>
        <Typography variant="h5" gutterBottom>
        גיבוי בסיס נתונים
        </Typography>
          <TimePicker
            clearable
            ampm={false}
            label="בחר שעה לביצוע הגיבוי:"
            classes={{ root: styles.textField }}
            value={this.state.formInputs.backup_datetime} 
              onChange={(event)=>this.formOnChange("backup_datetime",event)}
          />
          <Button className={styles.saveBtn} style={{}} name="submit" variant="contained" color="primary" onClick={(event) => this.saveSettings(event)}>
            שמור
        </Button>
        </form>

          {/* <DateTimePicker 
          value={this.state.formInputs.backup_datetime} 
          onChange={(event)=>this.formOnChange("backup_datetime",event)}
          disablePast={true}
          /> */}

    

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