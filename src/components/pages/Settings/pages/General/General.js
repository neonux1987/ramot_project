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

  saveSettings = (event) => {

  }

  render() {
    const {
      generalSettings
    } = this.props.generalSettings;
    console.log(generalSettings.isFetching === true)
    if (generalSettings.isFetching) {
      return <LoadingCircle />
    }
    return (
      <Fragment>

        <form>
          <TextField
            name="code"
            label='הזן מע"מ'
            required
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
  updateGeneralSettings: (payload, data) => dispatch(generalSettingsActions.updateGeneralSettings(payload, data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(General);