// LIBRARIES
import React, { useEffect, Fragment } from 'react';
import { Button, Typography, MenuItem } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { Restore } from '@material-ui/icons';

// CSS
import {
  restoreButton
} from './Restore.module.css';

// COMPONENTS
import StyledExpandableSection from '../../../../../components/Section/StyledExpandableSection';

// ACTIONS
import {
  fetchRegisteredBackups
} from '../../../../../redux/actions/registeredBackupsActions';

// LOADERS
import DefaultLoader from '../../../../../components/AnimatedLoaders/DefaultLoader';
import { selectFileDialog } from '../../../../../services/electronDialogs.svc';
import RestoreFromList from './RestoreFromList/RestoreFromList';
import RestoreFromFile from './RestoreFromFile/RestoreFromFile';

const NO_BACKUPS_MESSAGE = "לא קיימים גיבויים שמורים";

export default () => {

  const dispatch = useDispatch();

  const { isFetching, data } = useSelector(store => store.registeredBackups);

  const [selectedBackupDate, setSelectedBackupDate] = React.useState("");

  useEffect(() => {
    dispatch(fetchRegisteredBackups()).then(({ data }) => {
      if (data.length === 0)
        setSelectedBackupDate(NO_BACKUPS_MESSAGE);
      else
        setSelectedBackupDate(data[0].backupDateTime);
    });
  }, [dispatch]);

  const backupsNamesRender = data.length > 0 ? data.map((backup, index) => {
    const date = new Date(backup.backupDateTime);
    const locale = date.toLocaleString();
    //to get rid off of the AM or PM
    const newLocaleDateTime = locale.slice(0, locale.length - 3);
    return <MenuItem value={backup.backupDateTime} key={index}>{newLocaleDateTime}</MenuItem>
  }) : <MenuItem value="לא קיימים גיבויים שמורים" disabled>
      לא קיימים גיבויים
</MenuItem>;

  const onBackupDateChangeHandler = (event) => {
    const { value } = event.target;
    setSelectedBackupDate(value);
  }

  const selectDbFileHandler = () => {
    selectFileDialog().then(({ canceled, filePaths }) => {
      if (!canceled) {
        console.log(filePaths);
      } // end if
    }); //end selectFolderDialog
  }

  const render = isFetching ?
    <DefaultLoader loading={isFetching} />
    :
    <Fragment>

      {/* <Typography className={styles.restoreLastUpdate} variant="subtitle1">{`גיבוי אחרון בוצע ב- ${12321}`}</Typography> */}

      <RestoreFromList
        onBackupDateChangeHandler={onBackupDateChangeHandler}
        selectedBackupDate={selectedBackupDate}
        backupsNamesRender={backupsNamesRender}
      />

      <RestoreFromFile selectDbFileHandler={selectDbFileHandler} />

      <Typography variant="body2">
        *לתשומת ליבך, לפני ביצוע שיחזור אנא גבה את בסיס הנתונים באופן ידני למקרה חירום.
    </Typography>

      <Button className={restoreButton} variant="contained" color="primary" >בצע שיחזור</Button>
    </Fragment>

  return (

    <StyledExpandableSection
      title={"שיחזור בסיס נתונים"}
      TitleIcon={Restore}
      iconBoxBg={"#1b966e"}
      padding={"20px"}
    >
      {render}
    </StyledExpandableSection>
  );
}