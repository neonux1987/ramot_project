// LIBRARIES
import React, { useEffect, Fragment } from 'react';
import { FormControl, Box, Button, Typography, Divider, Select, MenuItem } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { Restore } from '@material-ui/icons';

// CSS
import styles from './Restore.module.css';

// COMPONENTS
import StyledExpandableSection from '../../../../../components/Section/StyledExpandableSection';

// ACTIONS
import {
  fetchRegisteredBackups
} from '../../../../../redux/actions/registeredBackupsActions';

// LOADERS
import DefaultLoader from '../../../../../components/AnimatedLoaders/DefaultLoader';
import { selectFileDialog } from '../../../../../services/electronDialogs.svc';

export default (props) => {

  const dispatch = useDispatch();

  const { isFetching, data } = useSelector(store => store.registeredBackups);

  const [selectedBackupDate, setSelectedBackupDate] = React.useState("לא קיימים גיבויים שמורים");

  useEffect(() => {
    dispatch(fetchRegisteredBackups()).then(({ data }) => {
      setSelectedBackupDate(data[0].backupDateTime);
    });
  }, [dispatch]);

  const backupsNamesRender = data.map((backup, index) => {
    const date = new Date(backup.backupDateTime);
    const locale = date.toLocaleString();
    //to get rid off of the AM or PM
    const newLocaleDateTime = locale.slice(0, locale.length - 3);
    return <MenuItem value={backup.backupDateTime} key={index}>{newLocaleDateTime}</MenuItem>
  });

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
      <div style={{ paddingBottom: "5px" }}>
        <Typography variant="h5" className={styles.dbRestoreTitle}>
          שיחזור בסיס נתונים
     </Typography>
      </div>

      <Divider className={styles.divider} />

      {/* <Typography className={styles.restoreLastUpdate} variant="subtitle1">{`גיבוי אחרון בוצע ב- ${12321}`}</Typography> */}

      <Typography variant="subtitle1" style={{ marginBottom: "20px" }}>
        <Box fontWeight="600">
          בחר גיבוי לפי תאריך:
        </Box>
      </Typography>

      <FormControl className={styles.restoreDateSelect}>
        <Select
          value={selectedBackupDate}
          onChange={selectDbFileHandler}
          inputProps={{
            name: 'backupsDates',
            id: 'backupsDates-label-placeholder',
          }}
          displayEmpty
          name="backupsDates"
        >
          {backupsNamesRender || <MenuItem value="לא קיימים גיבויים שמורים" disabled>
            לא קיימים גיבויים
</MenuItem>}
        </Select>
      </FormControl>

      <div style={{ marginBottom: "40px" }}>
        <Typography variant="subtitle1" style={{ marginBottom: "20px" }}>
          <Box fontWeight="600">
            או שחזר מקובץ גיבוי שנמצא במחשבך
        </Box>
        </Typography>
        <Button style={{ display: "inline-flex" }} variant="contained" color="primary" onClick={props.dbIndependentBackup}>בחר קובץ גיבוי</Button>
      </div>

      <Typography variant="body2">
        *לתשומת ליבך, לפני ביצוע שיחזור אנא גבה את בסיס הנתונים באופן ידני למקרה חירום.
    </Typography>
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