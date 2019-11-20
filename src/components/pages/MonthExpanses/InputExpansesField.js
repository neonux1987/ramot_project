import React, { Component } from 'react';
import { TextField, withStyles, Button, Select, InputLabel, MenuItem } from '@material-ui/core';
import Spinner from '../../common/Spinner/Spinner';
import ReactSelect from '../../common/ReactSelect/ReactSelect';

const styles = theme => ({
  container: {
    display: 'flex',
    justifyContent: 'center',
    margin: "10px 0 30px"
  },
  textField: {
    marginLeft: theme.spacing(),
    marginRight: theme.spacing(),
    width: 200,
  },
  codeTextField: {
    width: "212px",
    marginLeft: "0px"
  },
  textFieldNotes: {
    marginLeft: theme.spacing(),
    marginRight: theme.spacing(),
    width: 300,
  },
  dense: {
    marginTop: 19,
  },
  menu: {
    width: 200,
  },
  button: {
    margin: "8px 0 8px 8px"
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
    this.formChangeHandler = this.formChangeHandler.bind(this);
    this.reset = this.reset.bind(this);
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
    let foundObj = null;
    if (code) {
      foundObj = this.props.summarizedSections.data.find((section) => {
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

  formChangeHandler(event) {
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

  reset() {
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

  renderForm() {
    const {
      expansesCodes,
      summarizedSections
    } = this.props;

    if (expansesCodes.isFetching || summarizedSections.isFetching) {
      return <Spinner loadingText={"טוען נתונים..."} />
    }

    return <form
      id="inputExpanses"
      noValidate
      autoComplete="off"
      //onKeyPress={(event) => this.inputEnterPress(event)}
      onChange={this.formChangeHandler} >

      <ReactSelect
        classes={{ root: this.props.classes.codeTextField }}
        inputValue={this.state.formInputs.code}
        onChangeHandler={this.reactSelectHandleChange}
        options={this.props.expansesCodes.data}
        getOptionLabel={(option) => option.code}
        getOptionValue={(option) => option.code}
        placeholder="הזן קוד:"
        onBlurHandler={this.reactSelectOnBlurHandler}
        autoFocus={true}
        onMenuClose={this.onMenuCloseHandler}
        inputId="code"
      />

      <ReactSelect
        inputValue={this.state.formInputs.codeName}
        onChangeHandler={this.reactSelectHandleChange}
        options={this.props.expansesCodes.data}
        getOptionLabel={(option) => option.codeName}
        getOptionValue={(option) => option.codeName}
        placeholder="הזן שם חשבון:"
        onBlurHandler={this.reactSelectOnBlurHandler}
        onMenuClose={this.onMenuCloseHandler}
        //onInputChange={e => this.reactSelectInputChangeHandler(e, "codeName")}
        inputId="codeName"
      />

      <TextField
        name="section"
        label="מקושר לסעיף מסכם:"
        className={this.props.classes.textField}
        value={this.state.formInputs.section}
        type="text"
        inputProps={{ 'data-order': 2, readOnly: true }}
        InputLabelProps={{ classes: { root: this.props.classes.inputLabel } }}
      />

      <TextField
        name="supplierName"
        label="שם הספק:"
        className={this.props.classes.textField}
        type="text"
        inputProps={{ 'data-order': 3 }}
        value={this.state.formInputs.supplierName}
        InputLabelProps={{ classes: { root: this.props.classes.inputLabel } }}
        inputRef={(input) => { this.supplierInput = input; }}
      />

      <TextField
        name="sum"
        label="הזן סכום:"
        className={this.props.classes.textField}
        value={this.state.formInputs.sum}
        type="number"
        inputProps={{ 'data-order': 4 }}
        InputLabelProps={{ classes: { root: this.props.classes.inputLabel } }}
      />

      <TextField
        name="notes"
        label="הערות:"
        className={this.props.classes.textFieldNotes}
        multiline
        value={this.state.formInputs.notes}
        inputProps={{ 'data-order': 5 }}
        InputLabelProps={{ classes: { root: this.props.classes.inputLabel } }}
      />

      <Button style={{ backgroundColor: "#fd5050" }} name="reset" type="reset" onClick={this.reset} variant="contained" color="primary" className={this.props.classes.button}>
        אפס
  </Button>

      <Button
        data-order="7"
        style={{ backgroundColor: "#439dd2" }}
        name="submit"
        variant="contained"
        color="primary"
        onClick={(event) => this.props.submitData(this.state.formInputs, this.reset)}
        className={this.props.classes.button}
      >
        שמור
  </Button>

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

export default withStyles(styles)(InputExpansesField);
