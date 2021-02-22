// LIBRARIES
import React from 'react';
import { scroller } from 'react-scroll';

// CSS
import styles from './EditControls.module.css';

// COMPONENTS
import EditButton from '../Buttons/EditButton';
import AddNewButton from '../Buttons/AddNewButton';


export default ({ editMode, toggleEditMode, addNewMode, toggleAddNewMode, style }) => {

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

  return <div className={styles.wrapper} style={style}>
    <EditButton on={editMode} onClick={clickWithScroll} />
    {
      toggleAddNewMode && <AddNewButton on={addNewMode} onClick={toggleAddNewMode} />
    }
  </div>;

}