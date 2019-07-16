import React, { Component } from 'react';
import { TextField, withStyles, Button, FormControlLabel, Checkbox, Select, FormControl, InputLabel, MenuItem } from '@material-ui/core';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: "baseline",
    width: "100%",
    paddingRight: "10px",
    //background: "#fff",
    //borderTop: "1px solid #eaeaea",
    //borderBottom: "1px solid #eaeaea",
    paddingTop: "7px"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  textFieldNotes: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 300,
  },
  dense: {
    marginTop: 19,
  },
  menu: {
    width: 200,
  },
  button: {
    margin: theme.spacing.unit
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
    margin: theme.spacing.unit,
    minWidth: 200,
  }
});

const expanseObjKeys = ["code", "codeName", "section", "supplierName", "sum", "notes", "submit"];

class InputExpansesField extends Component {

  constructor(props) {
    super(props);
    this.state = {
      formInputs: {
        code: "",
        codeName: "",
        summarized_section_id: "",
        section: "",
        supplierName: "",
        sum: "",
        notes: ""
      },
      isNew: false
    };
    this.formChangeHandler = this.formChangeHandler.bind(this);
    this.reset = this.reset.bind(this);
  }

  /**
   * on key enter press, move to th next input element
   * @param {*} event the event of the current clicked element
   * @param {*} nextElement the next element to forward to focus to
   */
  inputEnterPress(event) {
    //focus on next elemnt when finished by hitting enter or out of focus
    if (event.key === "Enter") {
      let index = expanseObjKeys.indexOf(event.target.name);//current selected element index in the array of keys
      let currentElement = event.target.form[expanseObjKeys[index]];//current selected form element
      //the next element to move the focus to
      let nextElement = event.target.form[expanseObjKeys[index + 1]];

      nextElement.focus();
      //auto complete the data in all input fields 
      //if the code or the codeName exist in the array or in db
      //and move the focus to the sum field which in most case the most used input
      if (currentElement.name === "code" || currentElement.name === "codeName") {
        let row = this.props.findData(currentElement.value, currentElement.value);
        if (row !== null) {
          this.autoCompleteForm(row);
          if (nextElement.name !== "submit") nextElement.select();
        } else if (row === null && currentElement.name !== "codeName") {
          this.reset();
          this.formChangeHandler(event);
          //not found in the data, it's new to be added
          this.setState({ isNew: true });
        }
      }
      //if the next element is the button with id submit
      //activate the click event to send the form data
      else if (nextElement.name === "submit") {
        nextElement.click();
        nextElement.blur();
      } else {
        if (nextElement.name !== "submit") nextElement.select();
      }
    }
  };

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

  autoCompleteFormIndex(row = null) {
    if (row !== null) {
      this.setState((prevState) => {
        return {
          ...prevState,
          formInputs: {
            code: row.code,
            codeName: row.codeName,
            summarized_section_id: row.summarized_section_id,
            section: row.section,
            supplierName: row.supplierName,
            sum: row.sum,
            notes: row.notes
          }
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
    this.setState({
      ...this.state,
      formInputs: {
        code: "",
        codeName: "",
        summarized_section_id: "",
        section: "",
        supplierName: "",
        sum: "",
        notes: ""
      },
      isNew: true
    });
  }

  render() {
    const selectDataRender = this.props.summarizedSections ? this.props.summarizedSections.map((summarizedSection) => {
      return <MenuItem value={summarizedSection.id} key={summarizedSection.id}>{summarizedSection.section}</MenuItem>
    }) : "";
    return (
      <form
        id="inputExpanses"
        className={this.props.classes.container}
        noValidate
        autoComplete="off"
        onKeyPress={(event) => this.inputEnterPress(event)}
        onChange={this.formChangeHandler} >
        <TextField
          name="code"
          label="הזן קוד:"
          required
          type="number"
          className={this.props.classes.textField}
          value={this.state.formInputs.code}
          style={{ width: 160 }}
          InputLabelProps={{ classes: { root: this.props.classes.inputLabel } }}
        />

        <TextField
          name="codeName"
          label="הזן שם חשבון:"
          className={this.props.classes.textField}
          value={this.state.formInputs.codeName}
          type="text"
          InputLabelProps={{ classes: { root: this.props.classes.inputLabel } }}
        />

        {!this.state.isNew && <TextField
          name="summarized_section_id"
          label="מקושר לסעיף מסכם:"
          className={this.props.classes.textField}
          value={this.state.formInputs.section}
          type="text"
          InputLabelProps={{ classes: { root: this.props.classes.inputLabel } }}
        />}

        {this.state.isNew && <FormControl className={this.props.classes.formControl}>
          <InputLabel className={this.props.classes.inputLabel} htmlFor="age-helper">בחר סעיף:</InputLabel>
          <Select
            name="summarized_section_id"
            value={this.state.formInputs.summarized_section_id}
            onChange={this.formChangeHandler}
            open={this.state.selectOpen}
            onClose={(event) => { }}
          >
            <MenuItem value="">
              <em></em>
            </MenuItem>
            {selectDataRender}
          </Select>
        </FormControl>}

        <TextField
          name="supplierName"
          label="שם הספק:"
          className={this.props.classes.textField}
          type="text"
          value={this.state.formInputs.supplierName}
          InputLabelProps={{ classes: { root: this.props.classes.inputLabel } }}
        />

        <TextField
          name="sum"
          label="הזן סכום:"
          className={this.props.classes.textField}
          value={this.state.formInputs.sum}
          type="number"
          InputLabelProps={{ classes: { root: this.props.classes.inputLabel } }}
        />

        <TextField
          name="notes"
          label="הערות:"
          className={this.props.classes.textFieldNotes}
          multiline
          value={this.state.formInputs.notes}

          InputLabelProps={{ classes: { root: this.props.classes.inputLabel } }}
        />

        <FormControlLabel
          labelPlacement="start"
          label="מיוחד?"
          control={
            <Checkbox
              checked={this.state.checkedB}
              //onChange={this.handleChange('מיוחד?')}
              value="checkedB"
              color="primary"
            />
          }
        />

        <Button style={{ backgroundColor: "#fd5050" }} name="reset" type="reset" onClick={this.reset} variant="contained" color="primary" className={this.props.classes.button}>
          אפס
        </Button>

        <Button style={{ backgroundColor: "#439dd2" }} name="submit" variant="contained" color="primary" onClick={(event) => this.props.submitData(this.state.formInputs, this.state.formInputs.index, this.reset, this.state.isNew)} className={this.props.classes.button}>
          שמור
        </Button>

      </form>
    );
  }
};

export default withStyles(styles)(InputExpansesField);
