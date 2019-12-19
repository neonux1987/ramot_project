import React, { Component } from 'react';
import { TextField, withStyles, Button } from '@material-ui/core';
import ReactSelect from '../../components/ReactSelect/ReactSelect';
import { connect } from 'react-redux';

import summarizedSectionsActions from '../../redux/actions/summarizedSectionsActions';
import expansesCodesActions from '../../redux/actions/expansesCodesActions';

const styles = theme => ({
  container: {
    margin: "10px 0 10px",
    boxShadow: "0px 0px 8px 2px rgba(0, 0, 0, 0.06)",
    padding: "10px",
    background: "#ffffff",
    boxShadow: "0px 0px 8px 2px rgba(0, 0, 0, 0.06)",
    borderRadius: "4px",
    border: "1px solid #00000024"
  },
  form: {
    display: "grid",
    gridTemplateColumns: "212px 1fr 1fr 1fr 1fr 300px 80px 80px",
  },
  textField: {
    marginLeft: theme.spacing(),
    marginRight: theme.spacing(),
  },
  codeTextField: {
    width: "initial"
  },
  textFieldNotes: {
    marginLeft: theme.spacing(),
    marginRight: theme.spacing(),
  },
  dense: {
    marginTop: 19,
  },
  menu: {
    width: 200,
  },
  buttonWrapper: {
    alignItems: "center",
    display: "flex",
  },
  button: {
    margin: "8px 0 8px 8px",
    backgroundColor: "#fbfbfb",
    border: "1px solid #dedede",
    color: "#000",
    background: "linear-gradient(180deg, rgba(255,255,255,1) 0%, rgb(248, 248, 249) 100%)",
    boxShadow: "none",
  },
  inputLabel: {
    color: "#000"
  },
  checkboxLabel: {
    margin: "0 16px"
  },
  formSelect: {
    display: "inline-block",
    padding: "0 10px",
    margin: "0 5px",
    width: "200px"
  },
  formControl: {
    margin: theme.spacing(),
    minWidth: 200,
  },
  spinnnerWrapper: {
    verticalAlign: "middle",
    display: "inline-flex",
    width: "212px",
    justifyContent: "center"
  }
});

let keys = {
  0: "code",
  1: "codeName",
  2: "section",
  3: "supplierName",
  4: "sum",
  5: "notes",
  6: "submit"
}

class InputExpansesField extends Component {

  constructor(props) {
    super(props);
    this.state = {
      formInputs: {
        code: null,
        codeName: null,
        summarized_section_id: "",
        section: "",
        supplierName: "",
        sum: "",
        notes: ""
      },
      isNew: false,
      isSpecial: false
    };
    this.supplierInput = React.createRef();
  }

  reactSelectHandleChange = (selectedOption) => {
    this.setState((prevState) => {
      return {
        formInputs: {
          ...prevState.formInputs,
          code: selectedOption,
          codeName: selectedOption
        }
      };
    }, () => {
      //find the section filld in the data
      //and fill the input if section exist
      const summarizedSection = this.findSection();
      if (summarizedSection) {
        this.setState({
          formInputs: {
            ...this.state.formInputs,
            section: summarizedSection.section,
            summarized_section_id: summarizedSection.id
          }
        });
      }
    });
  };

  reactSelectOnBlurHandler = (event) => {
    //this.supplierInput.focus();
  }

  reactSelectInputChangeHandler = (value, name) => {

    /* this.setState({
      formInputs: {
        ...this.state.formInputs,
        [name]: {
          [name]: value
        }
      }
    }, () => {
      console.log(this.state.formInputs);
    }); */
  }

  onMenuCloseHandler = () => {
    this.supplierInput.focus();
  }

  findSection = () => {
    const { code } = this.state.formInputs;
    const { data } = this.props.summarizedSections.summarizedSections;
    let foundObj = null;

    if (code) {
      foundObj = data.find((section) => {
        return section.id === code.summarized_section_id;
      });
    }
    return foundObj;
  }

  findExpanse = (code, codeName) => {
    let foundObj = null;
    if (code) {
      foundObj = this.props.data.find((expanse) => {
        return expanse.id === code.summarized_section_id;
      });
    }
    return foundObj;
  }

  /**
   * auto complete expanse into the form inputs
   * @param {*} row the row to insert into the forum
   * @param {*} form the form to which the row will be inserted
   */
  autoCompleteForm(row = null) {
    if (row !== null) {
      this.setState((prevState) => {
        return {
          formInputs: {
            code: this.props.data[row].code,
            codeName: this.props.data[row].codeName,
            summarized_section_id: this.props.data[row].summarized_section_id,
            section: this.props.data[row].section,
            supplierName: this.props.data[row].supplierName,
            sum: this.props.data[row].sum,
            notes: this.props.data[row].notes,
            index: row
          },
          isNew: false
        };
      })
    }
  }

  formChangeHandler = (event) => {
    let target = event.target;
    this.setState((prevState) => {
      return {
        formInputs: {
          ...prevState.formInputs,
          [target.name]: target.value
        }
      };
    });
  }

  reset = () => {
    this.setState(() => {
      keys[2] = "section";
      return {
        ...this.state,
        formInputs: {
          code: null,
          codeName: null,
          summarized_section_id: "",
          section: "",
          supplierName: "",
          sum: "",
          notes: ""
        },
        isNew: false
      }
    });
  }

  submit = () => {
    this.props.submitData(this.state.formInputs, this.reset);
  }

  componentDidMount() {
    // fetch expnases codes
    this.props.fetchExpansesCodes();
    // fetch summarized sections
    this.props.fetchSummarizedSections();
  }

  componentWillUnmount() {
    //cleanup
    this.props.summarizedSectionsCleanup();
    this.props.expansesCodesCleanup();
  }

  renderForm() {
    const { expansesCodes } = this.props.expansesCodes;
    const { summarizedSections } = this.props.summarizedSections;

    let codesFetching = expansesCodes.isFetching || expansesCodes.data.length === 0;
    let sectionsFetching = summarizedSections.isFetching || summarizedSections.data.length === 0;

    const combinedFetching = codesFetching || sectionsFetching;

    const { classes } = this.props;

    return <form
      className={classes.form}
      id="inputExpanses"
      noValidate
      autoComplete="off"
      //onKeyPress={(event) => this.inputEnterPress(event)}
      onChange={this.formChangeHandler} >

      <ReactSelect
        classes={{ root: classes.codeTextField }}
        inputValue={this.state.formInputs.code}
        onChangeHandler={this.reactSelectHandleChange}
        options={expansesCodes.data}
        getOptionLabel={(option) => option.code}
        getOptionValue={(option) => option.code}
        placeholder="הזן קוד:"
        onBlurHandler={this.reactSelectOnBlurHandler}
        autoFocus={true}
        onMenuClose={this.onMenuCloseHandler}
        inputId="code"
        isLoading={codesFetching}
        isDisabled={codesFetching || sectionsFetching}
      />

      <ReactSelect
        classes={{ root: classes.codeTextField }}
        inputValue={this.state.formInputs.codeName}
        onChangeHandler={this.reactSelectHandleChange}
        options={expansesCodes.data}
        getOptionLabel={(option) => option.codeName}
        getOptionValue={(option) => option.codeName}
        placeholder="הזן שם חשבון:"
        onBlurHandler={this.reactSelectOnBlurHandler}
        onMenuClose={this.onMenuCloseHandler}
        //onInputChange={e => this.reactSelectInputChangeHandler(e, "codeName")}
        inputId="codeName"
        isLoading={sectionsFetching}
        isDisabled={sectionsFetching || codesFetching}
      />

      <TextField
        name="section"
        label="מקושר לסעיף מסכם:"
        className={classes.textField}
        value={this.state.formInputs.section}
        type="text"
        inputProps={{ 'data-order': 2, readOnly: true }}
        InputLabelProps={{ classes: { root: classes.inputLabel } }}
        disabled={combinedFetching}
      />

      <TextField
        name="supplierName"
        label="שם הספק:"
        className={classes.textField}
        type="text"
        inputProps={{ 'data-order': 3 }}
        value={this.state.formInputs.supplierName}
        InputLabelProps={{ classes: { root: classes.inputLabel } }}
        inputRef={(input) => { this.supplierInput = input; }}
        disabled={combinedFetching}
      />

      <TextField
        name="sum"
        label="הזן סכום:"
        className={classes.textField}
        value={this.state.formInputs.sum}
        type="number"
        inputProps={{ 'data-order': 4 }}
        InputLabelProps={{ classes: { root: classes.inputLabel } }}
        disabled={combinedFetching}
      />

      <TextField
        name="notes"
        label="הערות:"
        className={classes.textFieldNotes}
        multiline
        value={this.state.formInputs.notes}
        inputProps={{ 'data-order': 5 }}
        InputLabelProps={{ classes: { root: classes.inputLabel } }}
        disabled={combinedFetching}
      />

      <div className={classes.buttonWrapper}>
        <Button
          name="reset"
          type="reset"
          onClick={this.reset}
          variant="contained"
          color="primary"
          className={classes.button}
          disabled={combinedFetching}
        >
          אפס
      </Button>
      </div>

      <div className={classes.buttonWrapper}>
        <Button
          data-order="7"
          name="submit"
          variant="contained"
          color="primary"
          onClick={this.submit}
          className={classes.button}
          disabled={combinedFetching}
        >
          שמור
        </Button>
      </div>


    </form>;
  }

  render() {
    return (
      <div className={this.props.classes.container}>
        {this.renderForm()}
      </div>
    );
  }
};

const mapStateToProps = state => ({
  summarizedSections: state.summarizedSections,
  expansesCodes: state.expansesCodes
});

const mapDispatchToProps = dispatch => ({
  fetchExpansesCodes: () => dispatch(expansesCodesActions.fetchExpansesCodes()),
  expansesCodesCleanup: () => dispatch(expansesCodesActions.expansesCodesCleanup()),
  fetchSummarizedSections: () => dispatch(summarizedSectionsActions.fetchSummarizedSections()),
  summarizedSectionsCleanup: () => dispatch(summarizedSectionsActions.summarizedSectionsCleanup()),
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(InputExpansesField));
