// LIBRARIES
import React from "react";
import {
  TextField,
  Select,
  FormControl,
  InputLabel,
  MenuItem
} from "@material-ui/core";
import styles from "./AddExpanseCode.module.css";
import ButtonWithSound from "../../../../../componentsWithSound/ButtonWithSound/ButtonWithSound";
import AddBoxContainer from "../../../../../components/AddBoxContainer/AddBoxContainer";

const AddExpanseCode = ({
  show,
  summarizedSections,
  reset,
  formInputs,
  submitHandler,
  onChange,
  setFormInput
}) => {
  const selectDataRender = summarizedSections
    ? summarizedSections.map((summarizedSection) => {
        return (
          summarizedSection.status !== "deleted" && (
            <MenuItem value={summarizedSection.id} key={summarizedSection.id}>
              {summarizedSection.section}
            </MenuItem>
          )
        );
      })
    : "";

  return (
    <AddBoxContainer show={show}>
      <form
        className={styles.boxWrapper}
        noValidate
        autoComplete="off"
        onChange={onChange}
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
          <InputLabel className={styles.inputLabel} htmlFor="age-helper">
            בחר סעיף:
          </InputLabel>
          <Select
            name="summarized_section_id"
            id="summarized_section_id"
            value={formInputs.summarized_section_id}
            onChange={onChange}
          >
            <MenuItem value="">
              <em></em>
            </MenuItem>
            {selectDataRender}
          </Select>
        </FormControl>

        <FormControl className={styles.formControl}>
          <InputLabel className={styles.inputLabel} htmlFor="age-helper">
            כולל מע"מ בביצוע:
          </InputLabel>
          <Select
            name="with_vat"
            id="with_vat"
            value={formInputs.with_vat}
            onChange={onChange}
          >
            <MenuItem value={0} key={0}>
              לא
            </MenuItem>
            <MenuItem value={1} key={1}>
              כן
            </MenuItem>
          </Select>
        </FormControl>

        <ButtonWithSound
          style={{ backgroundColor: "#fd5050" }}
          type="reset"
          onClick={() =>
            reset(
              {
                code: "",
                codeName: "",
                summarized_section_id: "",
                with_vat: 0
              },
              setFormInput
            )
          }
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
          onClick={() => submitHandler(formInputs)}
          className={styles.button}
        >
          הוסף
        </ButtonWithSound>
      </form>
    </AddBoxContainer>
  );
};

export default AddExpanseCode;
