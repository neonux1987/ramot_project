import React from 'react';
import { Button } from '@material-ui/core';
import styles from './EditControls.module.css';

export default ({ editMode, toggleEditMode, addNewMode, toggleAddNewMode }) => {

  const editBtnTitle = editMode ? "בטל עריכה" : "עריכה";
  const addNewBtnTitle = addNewMode ? "בטל הוספה" : "הוסף חדש";

  return (
    <div className={styles.wrapper}>
      <Button className={styles.editBtn} onClick={toggleEditMode} variant="contained" color="primary" >
        {editBtnTitle}
      </Button>

      <Button className={styles.addNewBtn} onClick={toggleAddNewMode} variant="contained" color="primary" >
        {addNewBtnTitle}
      </Button>
    </div>
  )

}