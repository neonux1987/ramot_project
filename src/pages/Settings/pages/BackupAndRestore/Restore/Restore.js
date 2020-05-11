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

export default (props) => {

  const dispatch = useDispatch();

  const { isFetching, data } = useSelector(store => store.registeredBackups);

  const [selectedBackupDate, SetSelectedBackupDate] = React.useState(data[0] ? data[0].backupDateTime : "לא קיימים גיבויים שמורים");

  useEffect(() => {
    dispatch(fetchRegisteredBackups());
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

  const dbBackupSelectHandler = (event) => {
    const { value } = event.target;
    SetSelectedBackupDate(value);
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
          value={data.length === 0 ? "לא קיימים גיבויים שמורים" : selectedBackupDate}
          onChange={dbBackupSelectHandler}
          inputProps={{
            name: 'backupsDates',
            id: 'backupsDates-label-placeholder',
          }}
          displayEmpty
          name="backupsDates"
        >
          {backupsNamesRender}
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