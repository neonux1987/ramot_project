import React from "react";
import { FormControl, Select } from "@material-ui/core";
import { restoreDateSelect, container } from "./RestoreFromList.module.css";
import RadioWithLabel from "../../../../../../components/Radio/RadioWithLabel";
import { MenuItem } from "@material-ui/core";

const NO_BACKUPS_MESSAGE = "לא קיימים גיבויים שמורים";

const RestoreFromList = (props) => {
  const {
    selectedBackupDate,
    onBackupDateChangeHandler,
    backupsNamesRender,
    onCheckBoxChangeHandler,
    byList,
    isExist
  } = props;

  return (
    <div className={container}>
      <RadioWithLabel
        label="שיחזור מתוך רשימת גיבויים"
        checked={byList}
        onChange={onCheckBoxChangeHandler}
        name="byList"
      />

      <FormControl className={restoreDateSelect}>
        <Select
          value={
            !isExist() && NO_BACKUPS_MESSAGE !== selectedBackupDate
              ? NO_BACKUPS_MESSAGE
              : selectedBackupDate
          }
          onChange={onBackupDateChangeHandler}
          inputProps={{
            name: "backupsDates",
            id: "backupsDates-label-placeholder"
          }}
          displayEmpty
          name="backupsDates"
          disabled={!byList}
        >
          {backupsNamesRender}
          {!isExist() && NO_BACKUPS_MESSAGE !== selectedBackupDate && (
            <MenuItem value="לא קיימים גיבויים שמורים" disabled>
              לא קיימים גיבויים
            </MenuItem>
          )}
        </Select>
      </FormControl>
    </div>
  );
};

export default RestoreFromList;
