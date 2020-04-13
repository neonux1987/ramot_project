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

        <StyledExpandableSection
          TitleIcon={Settings}
          iconBoxBg={"#1b966e"}
          extraDetails={() =>
            <SaveButton>שמור</SaveButton>
          }
          padding={"30px 20px 40px"}
        >
          <form className={styles.form} onChange={(event) => this.formOnChange(event)} onSubmit={(event) => event.preventDefault()}>

            <Typography variant="subtitle1" style={{ margin: "0px 0 10px" }}>
              <Box fontWeight="600">
                מיקום בסיס הנתונים
              </Box>
            </Typography>

            <Button variant="contained" color="primary" >בחר מיקום</Button>
            <TextField
              id="outlined-bare"
              disabled
              classes={{ root: styles.dbFileTextFieldLocationWrapper }}
              value={"מיקום"}
              onChange={() => { }}
              variant="outlined"
              inputProps={{ 'aria-label': 'bare', className: styles.dbFileTextFieldLocationInput }}
            />

            <Typography variant="subtitle1" style={{ margin: "40px 0 10px" }}>
              <Box fontWeight="600">
                מיקום דוחות מוכנים
              </Box>
            </Typography>

            <Button variant="contained" color="primary" >בחר מיקום</Button>
            <TextField
              id="outlined-bare"
              disabled
              classes={{ root: styles.dbFileTextFieldLocationWrapper }}
              value={"מיקום"}
              onChange={() => { }}
              variant="outlined"
              inputProps={{ 'aria-label': 'bare', className: styles.dbFileTextFieldLocationInput }}
            />

          </form>
        </StyledExpandableSection>


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