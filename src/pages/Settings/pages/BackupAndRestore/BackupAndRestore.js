// LIBRARIES
import React from 'react';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import heLocale from "date-fns/locale/he";

// CSS
import styles from './BackupAndRestore.module.css';

// CONTAINERS
import BackupContainer from './Backup/BackupContainer';
import Restore from './Restore/Restore';
import GoodByeWrapper from '../../../../goodbye/GoodByeWrapper';

const localeMap = {
  he: heLocale
};

const BackupAndRestore = () => {

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils} locale={localeMap["he"]}>

      <div className={styles.form}>

        <BackupContainer />

        <Restore />

        <GoodByeWrapper />
      </div>

    </MuiPickersUtilsProvider>
  );

}



export default BackupAndRestore;