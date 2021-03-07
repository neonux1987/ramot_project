// LIBRARIES
import React from 'react';

// CSS
import styles from './BackupAndRestore.module.css';

// CONTAINERS
import BackupContainer from './Backup/BackupContainer';
import Restore from './Restore/Restore';
import GoodByeWrapper from '../../../../goodbye/GoodByeWrapper';
import Page from '../../../../components/Page/Page';

const BackupAndRestore = () => {

  return <Page>

    <BackupContainer />

    <Restore />

    <GoodByeWrapper />
  </Page>;

}



export default BackupAndRestore;