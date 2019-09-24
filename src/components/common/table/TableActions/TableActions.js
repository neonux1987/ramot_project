import React from 'react';
import { DeleteForever } from '@material-ui/icons';
import styles from './TableActions.module.css';
import YesNoDialog from '../YesNoDialog/YesNoDialog';

export default (props) => {

  const [showDialog, setShowDialog] = React.useState(false);

  const showDialogHandler = () => {
    setShowDialog(true);
  }

  const closeDialogHandler = () => {
    setShowDialog(false);
  }

  return <div className={styles.wrapper}>
    <button onClick={showDialogHandler} className={styles.btn} style={{ display: showDialog ? "none" : "block" }}>
      <DeleteForever className={styles.icon} />
    </button>
    <YesNoDialog closeDialog={closeDialogHandler} show={showDialog} deleteHandler={props.deleteHandler} />
  </div>
    ;

}