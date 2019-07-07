import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import generalSettingsActions from '../../../../../redux/actions/generalSettingsActions';
import { TextField, Button, Select, FormControl, InputLabel, MenuItem } from '@material-ui/core';
import LoadingCircle from '../../../../common/LoadingCircle';

class General extends Component {

  state = {
    formInputs: {
      tax: null
    }
  }

  componentDidMount() {
    this.props.fetchGeneralSettings();
  }

  componentWillUnmount() {
  }

  formOnChange = (event) => {
    let target = event.target;
    let copyData = [...this.props.generalSettings.generalSettings.data];
    copyData[0][target.name] = target.type === "number" ? parseFloat(target.value) : target.value;
    this.props.receiveGeneralSettings(copyData);
  }

  saveSettings = (event) => {
    const data = { ...this.props.generalSettings.generalSettings.data[0] }
    const params = {
      id: data.id,
      settings: {
        tax: data.tax
      }
    }
    this.props.updateGeneralSettings(params);
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

        <form onChange={(event) => this.formOnChange(event)} onSubmit={(event) => event.preventDefault()}>
          <TextField
            name="tax"
            label='הזן מע"מ'
            type="number"
            value={generalSettings.data[0].tax}
            style={{ width: 160 }}
          />
          <Button style={{ backgroundColor: "#439dd2" }} name="submit" variant="contained" color="primary" onClick={(event) => this.saveSettings(event)}>
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
  updateGeneralSettings: (payload) => dispatch(generalSettingsActions.updateGeneralSettings(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(General);