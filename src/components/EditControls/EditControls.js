import React from 'react';
import { Button } from '@material-ui/core';
import { Add, Edit, RemoveCircle } from '@material-ui/icons';
import styles from './EditControls.module.css';
import classnames from 'classnames';

export default ({ editMode, toggleEditMode, addNewMode, toggleAddNewMode, style }) => {

  // edit settings
  const editBtnTitle = editMode ? "בטל עריכה" : "עריכה";
  const editIcon = editMode ? <RemoveCircle className={styles.editIcon} style={{ color: "#ff2864" }} /> : <Edit className={styles.editIcon} />

  // add settings
  const addNewBtnTitle = addNewMode ? "בטל הוספה" : "הוסף חדש";
  const addNewBtnStyle = "" //addNewMode ? styles.red : "";
  const addIcon = addNewMode ? <RemoveCircle className={styles.addIcon} style={{ color: "#ff2864" }} /> : <Add className={styles.addIcon} />

  return (
    <div className={styles.wrapper} style={style}>
      <Button className={styles.editBtn} onClick={toggleEditMode} variant="contained" >
        {editBtnTitle} {editIcon}
      </Button>

      {
        toggleAddNewMode && <Button className={classnames(styles.addNewBtn, addNewBtnStyle)} onClick={toggleAddNewMode} variant="contained" >
          {addNewBtnTitle} {addIcon}
        </Button>
      }
    </div>
  )

}