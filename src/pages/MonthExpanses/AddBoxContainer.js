import React, { Component } from 'react';
import { TextField, withStyles, Button } from '@material-ui/core';
import ReactSelect from '../../components/ReactSelect/ReactSelect';
import { connect } from 'react-redux';

import * as summarizedSectionsActions from '../../redux/actions/summarizedSectionsActions';
import * as expansesCodesActions from '../../redux/actions/expansesCodesActions';
import { toast } from 'react-toastify';
import { playSound, soundTypes } from '../../audioPlayer/audioPlayer';

const styles = theme => ({
  container: {
    margin: "0px 0 10px",
    padding: "10px 10px 0",
    background: "#ffffff",
    //boxShadow: "0px 0px 8px 2px rgba(0, 0, 0, 0.06)",
    borderBottom: "1px solid #00000024",
    position: "relative",
    zIndex: "3",
    background: "linear-gradient(180deg, rgba(255,255,255,1) 0%, rgb(248, 248, 249) 100%)",
    boxShadow: "0 0 14px -5px #0000002b",
    borderRight: "5px solid #3e6ca7",
    borderLeft: "5px solid #3e6ca7"
  },
  form: {
    display: "flex",
    flexWrap: "wrap",
  },
  textField: {
    marginLeft: theme.spacing(),
    marginRight: theme.spacing(),
    flex: "auto"
  },
  codeTextField: {
    //width: "initial"
    flexGrow: "initial",
    minWidth: "220px",
    width: "218px"
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
    marginTop: "60px"
  },
  buttonWrapper: {
    alignItems: "center",
    display: "flex",
  },
  button: {
    margin: "8px 0 8px 8px",
    color: "#000",
    background: "none",
    boxShadow: "none",
    fontWeight: "bold",
    "&:hover": {
      background: "rgb(243, 243, 243)",
      boxShadow: "none",
      border: "1px solid #dedede"
    }
  },
  inputUnderline: {
    borderBottom: "none"
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
  },
  warningColor: {
    color: "red"
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
      let summarizedSection = this.findSection();

      if (summarizedSection === undefined) {
        summarizedSection = {
          section: "סעיף מסכם לא קיים"
        }
      }

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
    const { data } = this.props.summarizedSections;

    return data.find((section) => {
      return section.id === code.summarized_section_id;
    });
  }

  findExpanse = (code) => {
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
    if (this.state.formInputs.section === "סעיף מסכם לא קיים")
      // send the error to the notification center
      toast.error(`הוספת שורה נכשלה. 
      קוד הנהלת חשבונות מקושר לסעיף מסכם שלא קיים. 
      נא צור את הסעיף בטבלת ניהול סעיפים מסכמים או קשר לסעיף אחר בטבלת ניהול ומעקב קודי הנהלת חשבונות`, {
        onOpen: () => playSound(soundTypes.error)
      });
    else
      this.props.submitData(this.state.formInputs, this.reset);
  }

  componentDidMount() {
    // fetch expnases codes
    this.props.fetchExpansesCodesByStatus("active");
    // fetch summarized sections
    this.props.fetchSummarizedSections("active");
  }

  componentWillUnmount() {
    //cleanup
    this.props.summarizedSectionsCleanup();
    this.props.expansesCodesCleanup();
  }

  renderForm() {
    const { expansesCodes, summarizedSections } = this.props;

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
        style={{ flexGrow: "7" }}
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
  fetchExpansesCodesByStatus: (status) => dispatch(expansesCodesActions.fetchExpansesCodesByStatus(status)),
  expansesCodesCleanup: () => dispatch(expansesCodesActions.expansesCodesCleanup()),
  fetchSummarizedSections: (status) => dispatch(summarizedSectionsActions.fetchSummarizedSections(status)),
  summarizedSectionsCleanup: () => dispatch(summarizedSectionsActions.summarizedSectionsCleanup()),
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(InputExpansesField));
