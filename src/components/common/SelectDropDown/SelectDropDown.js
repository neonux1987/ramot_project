import React from 'react';
import { Select, FormControl, InputLabel, MenuItem } from '@material-ui/core';
import styles from './SelectDropDown.module.css';

const SelectDropDown = ({ targetValue, itemsArr, selectChangeHandler, rowNumber }) => {

  let selectDataRender = null;
  if (itemsArr.length > 1) {
    selectDataRender = itemsArr.map((summarizedSection) => {
      return <MenuItem value={summarizedSection.id} key={summarizedSection.id}>{summarizedSection.section}</MenuItem>
    });
  }
  return (
    <FormControl className={styles.formControl}>
      <InputLabel className={styles.inputLabel} htmlFor="age-helper">בחר סעיף מסכם:</InputLabel>
      <Select
        name="summarized_section_id"
        value={targetValue}
        onChange={(event) => selectChangeHandler(event.target.name, event.target.value, rowNumber)}
      >
        <MenuItem value="">
          <em></em>
        </MenuItem>
        {selectDataRender}
      </Select>
    </FormControl>
  );

}

export default SelectDropDown;