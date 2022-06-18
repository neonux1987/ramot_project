import React from "react";
import { TextField } from "@material-ui/core";
import styles from "./AddSummarizedSection.module.css";
import ButtonWithSound from "../../../../../componentsWithSound/ButtonWithSound/ButtonWithSound";
import AddBoxContainer from "../../../../../components/AddBoxContainer/AddBoxContainer";

const AddSummarizedSection = ({
  show,
  onSubmit,
  onChange,
  onReset,
  formInputs
}) => {
  return (
    <AddBoxContainer className={styles.boxWrapper} show={show}>
      <div className={styles.boxWrapper}>
        <TextField
          name="section"
          label="הזן שם סעיף"
          onChange={onChange}
          className={styles.textField}
          type="text"
          value={formInputs.section}
          InputLabelProps={{ classes: { root: styles.inputLabel } }}
        />

        <ButtonWithSound
          style={{ backgroundColor: "#fd5050" }}
          type="reset"
          onClick={onReset}
          variant="contained"
          color="primary"
          className={styles.button}
        >
          אפס
        </ButtonWithSound>

        <ButtonWithSound
          style={{ backgroundColor: "#439dd2" }}
          name="submit"
          variant="contained"
          color="primary"
          onClick={onSubmit}
          className={styles.button}
        >
          הוסף
        </ButtonWithSound>
      </div>
    </AddBoxContainer>
  );
};

export default AddSummarizedSection;
