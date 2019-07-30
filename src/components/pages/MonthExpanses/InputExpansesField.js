import React, { Component } from 'react';
import { TextField, withStyles, Button, Select, FormControl, InputLabel, MenuItem } from '@material-ui/core';

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
        code: "",
        codeName: "",
        summarized_section_id: "",
        section: "",
        supplierName: "",
        sum: "",
        notes: ""
      },
      isNew: false,
      isSpecial: false
    };
    this.codeInput = React.createRef();
    this.supplierInput = React.createRef();
    this.formChangeHandler = this.formChangeHandler.bind(this);
    this.reset = this.reset.bind(this);
  }

  componentDidMount() {
    this.codeInput.focus();
  }

  /**
   * on key enter press, move to th next input element
   * @param {*} event the event of the current clicked element
   * @param {*} nextElement the next element to forward to focus to
   */
  inputEnterPress(event, dataOrder) {
    //focus on next elemnt when finished by hitting enter or out of focus
    if (event.key === "Enter") {
      event.preventDefault();
      let index = Number.parseInt(event.target.dataset.order || dataOrder);//current selected element index in the array of keys
      let currentElement = event.target.form[keys[index]];//current selected form element
      //the next element to move the focus to
      let nextElement = event.target.form[keys[index + 1]];

      if (keys[index + 1] === "summarized_section_id") {
        //get the clickable div from the hidden input element
        const clickableElement = nextElement.previousSibling;
        clickableElement.focus();
        clickableElement.click();
      } else {
        nextElement.focus();
      }


      //auto complete the data in all input fields 
      //if the code or the codeName exist in the array or in db
      //and move the focus to the sum field which in most case the most used input
      if (currentElement.name === "code" || currentElement.name === "codeName") {
        let row = this.props.findData(currentElement.value, currentElement.value);
        if (row !== null) {
          keys[2] = "section";
          this.autoCompleteForm(row);
          if (nextElement.name !== "submit") nextElement.select();
        } else if (row === null && currentElement.name !== "codeName" && currentElement.value !== "") {
          this.reset();
          this.formChangeHandler(event);
          let isSpecial = false;
          if (currentElement.value.startsWith(9, 0)) {
            isSpecial = true;
          }

          //not found in the data, it's new to be added
          this.setState(() => {
            keys[2] = "summarized_section_id";
            return {
              isNew: true,
              isSpecial: isSpecial
            };
          });
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
          code: "",
          codeName: "",
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
          inputProps={{ 'data-order': 0 }}
          inputRef={(input) => { this.codeInput = input; }}
        />

        <TextField
          name="codeName"
          label="הזן שם חשבון:"
          className={this.props.classes.textField}
          value={this.state.formInputs.codeName}
          type="text"
          inputProps={{ 'data-order': 1 }}
          InputLabelProps={{ classes: { root: this.props.classes.inputLabel } }}
        />

        {!this.state.isNew && <TextField
          name="section"
          label="מקושר לסעיף מסכם:"
          className={this.props.classes.textField}
          value={this.state.formInputs.section}
          type="text"
          inputProps={{ 'data-order': 2, readOnly: true }}
          InputLabelProps={{ classes: { root: this.props.classes.inputLabel } }}
        />}

        {this.state.isNew && <FormControl className={this.props.classes.formControl}>
          <InputLabel className={this.props.classes.inputLabel} htmlFor="age-helper">בחר סעיף:</InputLabel>
          <Select
            value={this.state.formInputs.summarized_section_id}
            onChange={this.formChangeHandler}
            inputProps={{
              'data-order': 2,
              name: "summarized_section_id"
            }}
            MenuProps={{ onExited: () => this.supplierInput.focus() }}//will handle moving the focus to the supplierName input
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

        <Button data-order="7" style={{ backgroundColor: "#439dd2" }} name="submit" variant="contained" color="primary" onClick={(event) => this.props.submitData(this.state.formInputs, this.reset, this.state.isNew)} className={this.props.classes.button}>
          שמור
        </Button>

      </form>
    );
  }
};

export default withStyles(styles)(InputExpansesField);
