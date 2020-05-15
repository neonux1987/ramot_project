import React from 'react';
import { FormControl, Select } from '@material-ui/core';
import {
  restoreDateSelect,
  subtitle
} from './RestoreFromList.module.css';
import SubtitleBoldTypography from '../../../../../../components/Typographies/SubtitleBoldTypography';

const NO_BACKUPS_MESSAGE = "לא קיימים גיבויים שמורים";

export default props => {

  const {
    selectedBackupDate,
    onBackupDateChangeHandler,
    backupsNamesRender
  } = props;

  return (
    <div>

      <SubtitleBoldTypography className={subtitle}>
        בחר גיבוי מהרשימה:
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