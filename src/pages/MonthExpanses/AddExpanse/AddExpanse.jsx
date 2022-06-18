// LIBRARIES
import React from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import ReactSelect from "../../../components/ReactSelect/ReactSelect";

// COMPONENTS
import AddBoxContainer from "../../../components/AddBoxContainer/AddBoxContainer";
import WhiteButton from "../../../components/buttons/WhiteButton";

const useStyles = makeStyles((theme) => ({
  container: {
    margin: "0px 0 10px",
    padding: "10px 10px 0",
    position: "relative",
    zIndex: "3",
    border: "1px solid #e3eaec",
    borderRadius: "5px",
    boxShadow: "rgba(53, 64, 82, 0.05) 0px 0px 14px 0px",
    backgroundColor: "#ffffff"
  },
  form: {
    display: "flex",
    flexWrap: "wrap",
    flexGrow: "1"
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
    marginRight: theme.spacing()
  },
  dense: {
    marginTop: 19
  },
  menu: {
    width: 200,
    marginTop: "60px"
  },
  buttonWrapper: {
    alignItems: "center",
    display: "flex"
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
    minWidth: 200
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
}));

const AddExpanse = ({
  expansesCodes,
  summarizedSections,
  formInputs,
  show,
  formChangeHandler,
  onMenuCloseHandler,
  reset,
  supplierInputRef,
  submit,
  reactSelectHandleChange
}) => {
  const classes = useStyles();

  const codesFetching =
    expansesCodes.isFetching || expansesCodes.data.length === 0;
  const sectionsFetching =
    summarizedSections.isFetching || summarizedSections.data.length === 0;
  const combinedFetching = codesFetching || sectionsFetching;

  return (
    <AddBoxContainer show={show}>
      <form
        className={classes.form}
        id="inputExpanses"
        noValidate
        autoComplete="off"
        onChange={formChangeHandler}
      >
        <ReactSelect
          classes={{ root: classes.codeTextField }}
          inputValue={formInputs.code}
          onChangeHandler={reactSelectHandleChange}
          options={expansesCodes.data}
          getOptionLabel={(option) => option.code}
          getOptionValue={(option) => option.code}
          placeholder="הזן קוד:"
          autoFocus={true}
          onMenuClose={onMenuCloseHandler}
          inputId="code"
          isLoading={codesFetching}
          isDisabled={codesFetching || sectionsFetching}
        />

        <ReactSelect
          classes={{ root: classes.codeTextField }}
          inputValue={formInputs.codeName}
          onChangeHandler={reactSelectHandleChange}
          options={expansesCodes.data}
          getOptionLabel={(option) => option.codeName}
          getOptionValue={(option) => option.codeName}
          placeholder="הזן שם חשבון:"
          onMenuClose={onMenuCloseHandler}
          inputId="codeName"
          isLoading={sectionsFetching}
          isDisabled={sectionsFetching || codesFetching}
        />

        <TextField
          name="section"
          label="מקושר לסעיף מסכם:"
          className={classes.textField}
          value={formInputs.section}
          type="text"
          inputProps={{ "data-order": 2, readOnly: true }}
          InputLabelProps={{ classes: { root: classes.inputLabel } }}
          disabled={combinedFetching}
        />

        <TextField
          name="supplierName"
          label="שם הספק:"
          className={classes.textField}
          type="text"
          inputProps={{ "data-order": 3 }}
          value={formInputs.supplierName}
          InputLabelProps={{ classes: { root: classes.inputLabel } }}
          inputRef={supplierInputRef}
          disabled={combinedFetching}
        />

        <TextField
          name="sum"
          label="הזן סכום:"
          className={classes.textField}
          value={formInputs.sum}
          type="number"
          inputProps={{ "data-order": 4 }}
          InputLabelProps={{ classes: { root: classes.inputLabel } }}
          disabled={combinedFetching}
        />

        <TextField
          name="notes"
          label="הערות:"
          className={classes.textFieldNotes}
          multiline
          value={formInputs.notes}
          inputProps={{ "data-order": 5 }}
          InputLabelProps={{ classes: { root: classes.inputLabel } }}
          disabled={combinedFetching}
          style={{ flexGrow: "7" }}
        />

        <div className={classes.buttonWrapper}>
          <WhiteButton
            name="reset"
            type="reset"
            onClick={reset}
            variant="contained"
            color="primary"
            disabled={combinedFetching}
          >
            אפס
          </WhiteButton>
        </div>

        <div className={classes.buttonWrapper}>
          <WhiteButton
            data-order="7"
            name="submit"
            variant="contained"
            color="primary"
            onClick={submit}
            disabled={combinedFetching}
          >
            הוסף
          </WhiteButton>
        </div>
      </form>
    </AddBoxContainer>
  );
};

export default AddExpanse;
