import React from 'react';
import { FormControl, InputLabel, Checkbox, Box, Button, Typography, Divider, TextField, Select, MenuItem } from '@material-ui/core';
import styles from './Restore.module.css';

export default (props) => {

  const { backupsNames, } = props;
  const [selectedBackupDate, SetSelectedBackupDate] = React.useState(backupsNames.data[0].backupDateTime);

  const backupsNamesRender = backupsNames.data.map((backup, index) => {
    const date = new Date(backup.backupDateTime);
    const locale = date.toLocaleString();
    //to get rid off of the AM or PM
    const newLocaleDateTime = locale.slice(0, locale.length - 3);
    return <MenuItem value={backup.backupDateTime} key={index}>{newLocaleDateTime}</MenuItem>
  });

  const dbBackupSelectHandler = (event) => {
    const { value } = event.target;
    SetSelectedBackupDate(value);
  }

  return (


    <div style={{ marginTop: "60px" }}>{/* db restore start */}
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

      {/* db restore end */}</div>
  );
}