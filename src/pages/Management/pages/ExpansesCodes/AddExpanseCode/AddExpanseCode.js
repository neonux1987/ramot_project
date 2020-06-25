// LIBRARIES
import React, { useState } from 'react';
import { TextField, Select, FormControl, InputLabel, MenuItem } from '@material-ui/core';
import styles from './AddExpanseCode.module.css'
import ButtonWithSound from '../../../../../componentsWithSound/ButtonWithSound/ButtonWithSound';
import AddBoxContainer from '../../../../../components/AddBoxContainer/AddBoxContainer';

const keys = ["code", "codeName", "summarized_section_id", "submit"];

const AddExpanseCode = (props) => {

  const [formInputs, setFormInput] = useState({
    code: "",
    codeName: "",
    summarized_section_id: "",
    with_vat: 0
  });

  const selectDataRender = props.summarizedSections ? props.summarizedSections.map((summarizedSection) => {
    if (summarizedSection.status === "deleted")
      return null;
    else
      return <MenuItem value={summarizedSection.id} key={summarizedSection.id}>{summarizedSection.section}</MenuItem>
  }) : "";

  return (
    <AddBoxContainer>

      <form
        className={styles.boxWrapper}
        noValidate
        autoComplete="off"
        onKeyPress={(event) => props.inputEnterPress(event, keys)}
        onChange={(event) => props.changeHandler(event, formInputs, setFormInput)}
        onSubmit={(event) => event.preventDefault()}
      >

        <TextField
          name="code"
          label="הזן קוד:"
          required
          type="number"
          className={styles.textField}
          value={formInputs.code}
          style={{ width: 160 }}
          InputLabelProps={{ classes: { root: styles.inputLabel } }}
        />

        <TextField
          name="codeName"
          label="הזן שם חשבון:"
          className={styles.textField}
          type="text"
          value={formInputs.codeName}
          InputLabelProps={{ classes: { root: styles.inputLabel } }}
        />

        <FormControl className={styles.formControl}>
          <InputLabel className={styles.inputLabel} htmlFor="age-helper">בחר סעיף:</InputLabel>
          <Select
            name="summarized_section_id"
            id="summarized_section_id"
            value={formInputs.summarized_section_id}
            onChange={(event) => props.changeHandler(event, formInputs, setFormInput)}
          >
            <MenuItem value="">
              <em></em>
            </MenuItem>
            {selectDataRender}
          </Select>
        </FormControl>

        <FormControl className={styles.formControl}>
          <InputLabel className={styles.inputLabel} htmlFor="age-helper">כולל מע"מ בביצוע:</InputLabel>
          <Select
            name="with_vat"
            id="with_vat"
            value={formInputs.with_vat}
            onChange={(event) => props.changeHandler(event, formInputs, setFormInput)}
          >
            <MenuItem value={0} key={0}>לא</MenuItem>
            <MenuItem value={1} key={1}>כן</MenuItem>
          </Select>
        </FormControl>

        <ButtonWithSound style={{ backgroundColor: "#fd5050" }} type="reset" onClick={() => props.reset({ code: "", codeName: "", summarized_section_id: "", with_vat: 0 }, setFormInput)} variant="contained" color="primary" className={styles.button}>
          אפס
        </ButtonWithSound>

        <ButtonWithSound style={{ backgroundColor: "#439dd2" }} name="submit" variant="contained" color="primary" onClick={() => props.submitHandler(formInputs)} className={styles.button}>
          הוסף
        </ButtonWithSound>

      </form>

    </AddBoxContainer>

  );
};

export default AddExpanseCode;
