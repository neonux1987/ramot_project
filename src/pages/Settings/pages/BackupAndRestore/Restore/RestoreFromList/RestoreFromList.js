import React from 'react';
import { FormControl, Select } from '@material-ui/core';
import {
  restoreDateSelect,
  container
} from './RestoreFromList.module.css';
import CheckboxWithLabel from '../../../../../../components/Checkboxes/CheckboxWithLabel';

const NO_BACKUPS_MESSAGE = "לא קיימים גיבויים שמורים";

const RestoreFromList = props => {

  const {
    selectedBackupDate,
    onBackupDateChangeHandler,
    backupsNamesRender,
    onCheckBoxChangeHandler,
    byList
  } = props;

  return (
    <div className={container}>

      <CheckboxWithLabel label="גיבוי מהרשימה:" checked={byList} onChange={onCheckBoxChangeHandler} name="byList" />

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
          disabled={!byList}
        >
          {backupsNamesRender}
        </Select>
      </FormControl>

    </div>
  );
}

export default RestoreFromList;