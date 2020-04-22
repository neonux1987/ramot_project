import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import generalSettingsActions from '../../../../redux/actions/generalSettingsActions';
import { TextField, Button, Typography, Box } from '@material-ui/core';
import LoadingCircle from '../../../../components/LoadingCircle';
import styles from './General.module.css';
import Section from '../../../../components/Section/Section';
import StyledExpandableSection from '../../../../components/Section/StyledExpandableSection';
import { Settings } from '@material-ui/icons';
import SaveButton from '../../../../components/SaveButton/SaveButton';
import Locations from './Locations/Locations';

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
    const value = target.type === "number" && target.value === "" ? 0 : target.value;
    this.setState(() => {
      return {
        ...this.state,
        formInputs: {
          ...this.formInputs,
          [target.name]: target.type === "number" ? parseFloat(value) : value
        }
      }
    })
  }

  saveSettings = (event) => {
    const data = [...this.props.generalSettings.generalSettings.data];
    const parsedFomInputs = this.parseFormInputs(this.state.formInputs);
    data[0].tax = parsedFomInputs.tax;

    const params = {
      id: data[0].id,
      settings: {
        ...parsedFomInputs
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
      <Fragment>

        <Locations />


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

export default connect(mapStateToProps, mapDispatchToProps)(General);