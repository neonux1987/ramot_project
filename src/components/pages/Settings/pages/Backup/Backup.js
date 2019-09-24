import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import generalSettingsActions from '../../../../../redux/actions/generalSettingsActions';
import { TextField, Button } from '@material-ui/core';
import LoadingCircle from '../../../../common/LoadingCircle';
import styles from './Backup.module.css';

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

  formOnChange = (event) => {
    let target = event.target;
    const date = new Date(target.value);
    const currentDate = new Date();
    if (currentDate > date) {
      console.log("לא ניתן להזין");
      return;
    }
    this.setState(() => {
      return {
        ...this.state,
        formInputs: {
          ...this.formInputs,
          [target.name]: target.value
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
    console.log(this.props.generalSettings.generalSettings);
    return (
      <Fragment>

        <form className={styles.form} onChange={(event) => this.formOnChange(event)} onSubmit={(event) => event.preventDefault()}>
          <label>בחר תאריך וזמן לביצוע הגיבוי:</label>
          <TextField
            name="backup_datetime"
            type="datetime-local"
            value={this.state.formInputs.backup_datetime}
            classes={{ root: styles.textField }}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <Button className={styles.saveBtn} style={{}} name="submit" variant="contained" color="primary" onClick={(event) => this.saveSettings(event)}>
            שמור
        </Button>
        </form>

      </Fragment>
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