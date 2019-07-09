import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import generalSettingsActions from '../../../../../redux/actions/generalSettingsActions';
import { TextField, Button, Select, FormControl, InputLabel, MenuItem } from '@material-ui/core';
import LoadingCircle from '../../../../common/LoadingCircle';
import styles from './General.module.css';

class General extends Component {

  state = {
    formInputs: {
      tax: this.props.generalSettings.generalSettings.data[0].tax
    }
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  formOnChange = (event) => {
    let target = event.target;

    this.setState(() => {
      return {
        ...this.state,
        formInputs: {
          ...this.formInputs,
          [target.name]: target.type === "number" ? parseFloat(target.value) : target.value
        }
      }
    })
  }

  saveSettings = (event) => {
    const data = [...this.props.generalSettings.generalSettings.data];
    data[0].tax = this.state.formInputs.tax;
    const params = {
      id: data[0].id,
      settings: {
        tax: this.state.formInputs.tax
      }
    };
    this.props.updateGeneralSettings(params, data);
  }

  render() {
    const {
      generalSettings
    } = this.props.generalSettings;
    if (generalSettings.isFetching) {
      return <LoadingCircle loading={generalSettings.isFetching} />
    }
    return (
      <Fragment>

        <form className={styles.form} onChange={(event) => this.formOnChange(event)} onSubmit={(event) => event.preventDefault()}>
          <label>מע"מ:</label>
          <TextField
            name="tax"
            type="number"
            value={this.state.formInputs.tax}
            classes={{ root: styles.textField }}
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
  ...state
});

const mapDispatchToProps = dispatch => ({
  fetchGeneralSettings: () => dispatch(generalSettingsActions.fetchGeneralSettings()),
  receiveGeneralSettings: (data) => dispatch(generalSettingsActions.receiveGeneralSettings(data)),
  updateGeneralSettings: (payload, data) => dispatch(generalSettingsActions.updateGeneralSettings(payload, data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(General);