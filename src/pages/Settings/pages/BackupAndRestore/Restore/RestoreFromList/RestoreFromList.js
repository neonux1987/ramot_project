import React from 'react';
import { FormControl, Select, Checkbox } from '@material-ui/core';
import {
  restoreDateSelect,
  subtitle,
  container
} from './RestoreFromList.module.css';
import SubtitleBoldTypography from '../../../../../../components/Typographies/SubtitleBoldTypography';

const NO_BACKUPS_MESSAGE = "לא קיימים גיבויים שמורים";

export default props => {

  const {
    selectedBackupDate,
    onBackupDateChangeHandler,
    backupsNamesRender,
    onCheckBoxChangeHandler,
    byList
  } = props;

  return (
    <div className={container}>

      <Checkbox
        checked={byList}
        onChange={onCheckBoxChangeHandler}
        name="byList"
        color="primary"
      />

      <SubtitleBoldTypography className={subtitle}>
        גיבוי מהרשימה:
        </SubtitleBoldTypography>

      <FormControl className={restoreDateSelect}>
        <Select
          value={selectedBackupDate === NO_BACKUPS_MESSAGE ? NO_BACKUPS_MESSAGE : selectedBackupDate}
          onChange={onBackupDateChangeHandler}
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

    </div>
  );
}