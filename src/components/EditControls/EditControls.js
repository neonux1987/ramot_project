import React from 'react';
import { Button } from '@material-ui/core';
import { Add, Edit, RemoveCircle } from '@material-ui/icons';
import styles from './EditControls.module.css';
import classnames from 'classnames';
import { scroller } from 'react-scroll'

export default ({ editMode, toggleEditMode, addNewMode, toggleAddNewMode, style }) => {

  // edit settings
  const editBtnTitle = editMode ? "בטל עריכה" : "עריכה";
  const editIcon = editMode ? <RemoveCircle className={styles.editIcon} /> : <Edit className={styles.editIcon} />

  // add settings
  const addNewBtnTitle = addNewMode ? "בטל הוספה" : "הוסף חדש";
  const addNewBtnStyle = "" //addNewMode ? styles.red : "";
  const addIcon = addNewMode ? <RemoveCircle className={styles.addIcon} /> : <Add className={styles.addIcon} />

  const clickWithScroll = (event) => {
    toggleEditMode(event)

    if (!editMode)
      scroller.scrollTo("tableElement", {
        duration: 800,
        delay: 0,
        containerId: 'mainContainer',
        smooth: "easeInOutQuart",
        offset: -57
      });
  }

  return (
    <div className={styles.wrapper} style={style}>
      <Button className={styles.editBtn} onClick={clickWithScroll} variant="contained" >
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