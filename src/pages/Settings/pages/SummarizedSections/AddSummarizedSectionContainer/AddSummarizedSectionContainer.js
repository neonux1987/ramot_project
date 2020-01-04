import React, { useState } from 'react';
import { TextField, Button, Select, FormControl, InputLabel, MenuItem } from '@material-ui/core';
import styles from './AddSummarizedSectionContainer.module.css'

const AddSummarizedSectionContainer = (props) => {

  const [formInputs, setFormInput] = useState({
    section: ""
  });

  return (

    <div className={styles.boxWrapper}>
      <TextField
        name="section"
        label="הזן שם סעיף"
        onChange={(event) => props.changeHandler(event, formInputs, setFormInput)}
        className={styles.textField}
        type="text"
        value={formInputs.section}
        InputLabelProps={{ classes: { root: styles.inputLabel } }}
      />

      <Button style={{ backgroundColor: "#fd5050" }} type="reset" onClick={() => props.reset({ section: "" }, setFormInput)} variant="contained" color="primary" className={styles.button}>
        אפס
        </Button>

      <Button style={{ backgroundColor: "#439dd2" }} name="submit" variant="contained" color="primary" onClick={(event) => props.submitHandler(formInputs)} className={styles.button}>
        הוסף
        </Button>
    </div>

  );
};

export default AddSummarizedSectionContainer;
