// LIBRARIES
import React from 'react';

// CSS
import styles from './BackupAndRestore.module.css';

// CONTAINERS
import BackupContainer from './Backup/BackupContainer';
import Restore from './Restore/Restore';
import GoodByeWrapper from '../../../../goodbye/GoodByeWrapper';

const BackupAndRestore = () => {

  return <div className={styles.form}>

    <BackupContainer />

    <Restore />

    <GoodByeWrapper />
  </div>;

}



export default BackupAndRestore;