import React from "react";
import { FormControl, Select } from "@material-ui/core";
import { restoreDateSelect, container } from "./RestoreFromList.module.css";
import RadioWithLabel from "../../../../../../components/Radio/RadioWithLabel";
import { MenuItem } from "@material-ui/core";

const NO_BACKUPS_MESSAGE = "לא קיימים גיבויים שמורים";

const RestoreFromList = (props) => {
  const {
    onBackupDateChangeHandler,
    backupsNamesRender,
    onCheckBoxChangeHandler,
    byList,
    fromListData
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
          value={fromListData.selectedBackupDate}
          onChange={onBackupDateChangeHandler}
          inputProps={{
            name: "backupsDates",
            id: "backupsDates-label-placeholder"
          }}
          name="backupsDates"
          disabled={!byList}
        >
          {backupsNamesRender}
          {fromListData.selectedBackupDate === NO_BACKUPS_MESSAGE && (
            <MenuItem value={NO_BACKUPS_MESSAGE} disabled>
              לא קיימים גיבויים
            </MenuItem>
          )}
        </Select>
      </FormControl>
    </div>
  );
};

export default RestoreFromList;
