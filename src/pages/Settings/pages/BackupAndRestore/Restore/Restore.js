import React, { useEffect } from 'react';
import { FormControl, InputLabel, Checkbox, Box, Button, Typography, Divider, TextField, Select, MenuItem } from '@material-ui/core';
import styles from './Restore.module.css';
import StyledExpandableSection from '../../../../../components/Section/StyledExpandableSection';
import { Restore } from '@material-ui/icons';
import SaveButton from '../../../../../components/SaveButton/SaveButton';
import LoadingCircle from '../../../../../components/LoadingCircle';
import { useDispatch, useSelector } from 'react-redux';

// ACTIONS
import {
  fetchBackupsNames,
  initializeBackupNames
} from '../../../../../redux/actions/backupsNamesActions';

export default (props) => {

  const dispatch = useDispatch();

  const backupsNames = useSelector(store => store.backupsNames);

  useEffect(() => {
    dispatch(fetchBackupsNames());
  }, [dispatch]);

  const [selectedBackupDate, SetSelectedBackupDate] = React.useState(backupsNames.data[0] ? backupsNames.data[0].backupDateTime : "לא קיימים גיבויים שמורים");

  if (backupsNames.isFetching) {
    return <LoadingCircle loading={backupsNames.isFetching} />
  }

  const backupsNamesRender = backupsNames.data.length > 0 ? backupsNames.data.map((backup, index) => {
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

  return (

    <StyledExpandableSection
      title={"שיחזור בסיס נתונים"}
      TitleIcon={Restore}
      iconBoxBg={"#1b966e"}
      padding={"20px"}
      extraDetails={() =>
        <SaveButton>שמור</SaveButton>
      }
    >{/* db restore start */}
      <div style={{ paddingBottom: "5px" }}>
        <Typography variant="h5" className={styles.dbRestoreTitle}>
          שיחזור בסיס נתונים
     </Typography>
      </div>

      <Divider className={styles.divider} />

      <Typography className={styles.restoreLastUpdate} variant="subtitle1">{`גיבוי אחרון בוצע ב- ${12321}`}</Typography>

      <Typography variant="subtitle1" style={{ marginBottom: "20px" }}>
        <Box fontWeight="600">
          בחר גיבוי לפי תאריך:
        </Box>
      </Typography>

      <FormControl className={styles.restoreDateSelect}>
        <Select
          value={selectedBackupDate}
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

      {/* db restore end */}</StyledExpandableSection>
  );
}