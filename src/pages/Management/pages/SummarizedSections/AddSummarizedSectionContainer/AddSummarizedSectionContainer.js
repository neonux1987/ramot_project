import React, { useState } from 'react';
import { TextField } from '@material-ui/core';
import styles from './AddSummarizedSectionContainer.module.css'
import ButtonWithSound from '../../../../../componentsWithSound/ButtonWithSound/ButtonWithSound';
import AddBoxContainer from '../../../../../components/AddBoxContainer/AddBoxContainer';
import useFormLogic from '../../../../../customHooks/useFormLogic';

const AddSummarizedSectionContainer = ({ show, submitHandler }) => {
  const { reset, changeHandler } = useFormLogic();

  const [formInputs, setFormInput] = useState({
    section: ""
  });

  return (

    <AddBoxContainer className={styles.boxWrapper} show={show}>
      <div className={styles.boxWrapper}>
        <TextField
          name="section"
          label="הזן שם סעיף"
          onChange={(event) => changeHandler(event, formInputs, setFormInput)}
          className={styles.textField}
          type="text"
          value={formInputs.section}
          InputLabelProps={{ classes: { root: styles.inputLabel } }}
        />

        <ButtonWithSound style={{ backgroundColor: "#fd5050" }} type="reset" onClick={() => reset({ section: "" }, setFormInput)} variant="contained" color="primary" className={styles.button}>
          אפס
        </ButtonWithSound>

        <ButtonWithSound style={{ backgroundColor: "#439dd2" }} name="submit" variant="contained" color="primary" onClick={() => submitHandler(formInputs)} className={styles.button}>
          הוסף
        </ButtonWithSound>
      </div>
    </AddBoxContainer>

  );
};

export default AddSummarizedSectionContainer;
