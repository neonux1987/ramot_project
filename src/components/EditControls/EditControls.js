// LIBRARIES
import React from 'react';
import { Remove, Edit } from '@material-ui/icons';
import { RiFileAddLine } from 'react-icons/ri';
import classnames from 'classnames';
import { scroller } from 'react-scroll';

// CSS
import styles from './EditControls.module.css';

// COMPONENTS WITH SOUND
import ButtonWithSound from '../../componentsWithSound/ButtonWithSound/ButtonWithSound';


export default ({ editMode, toggleEditMode, addNewMode, toggleAddNewMode, style }) => {

  // edit settings
  const editBtnTitle = editMode ? "בטל עריכה" : "עריכה";
  const editIcon = editMode ? <Remove className={styles.editIcon} style={{ color: "#ff2864" }} /> : <Edit className={styles.editIcon} />

  // add settings
  const addNewBtnTitle = addNewMode ? "בטל הוספה" : "חדש";
  const addNewBtnStyle = "" //addNewMode ? styles.red : "";
  const addIcon = addNewMode ? <Remove className={styles.addIcon} style={{ color: "#ff2864" }} /> : <RiFileAddLine className={styles.addIcon} />

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
      <ButtonWithSound className={styles.editBtn} onClick={clickWithScroll} variant="contained" >
        {editBtnTitle} {editIcon}
      </ButtonWithSound>
      {
        toggleAddNewMode && <ButtonWithSound className={classnames(styles.addNewBtn, addNewBtnStyle)} onClick={toggleAddNewMode} variant="contained" >
          {addNewBtnTitle} {addIcon}
        </ButtonWithSound>
      }
    </div>
  )

}