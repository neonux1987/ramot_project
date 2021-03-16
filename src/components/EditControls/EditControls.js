// LIBRARIES
import React from 'react';
import classnames from 'classnames';
// CSS
import styles from './EditControls.module.css';

// COMPONENTS
import EditButton from '../buttons/EditButton';
import AddNewButton from '../buttons/AddNewButton';


const EditControls = ({ editMode, toggleEditMode, addNewMode, toggleAddNewMode, style, dataExist = false }) => {

  const show = dataExist ? styles.show : styles.hide;

  const clickWithScroll = (event) => {
    toggleEditMode(event)
  }

  return <div className={classnames(styles.wrapper, show)} style={style}>
    <EditButton on={editMode} onClick={clickWithScroll} />
    {
      toggleAddNewMode && <AddNewButton on={addNewMode} onClick={toggleAddNewMode} />
    }
  </div>;

}

export default EditControls;