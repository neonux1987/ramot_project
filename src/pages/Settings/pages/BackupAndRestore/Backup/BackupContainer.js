// LIBRARIES
import React, { useState, memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MenuItem } from '@material-ui/core';
import { Backup } from '@material-ui/icons';

// COMPONENTS
import StyledExpandableSection from '../../../../../components/Section/StyledExpandableSection';
import SaveButton from '../../../../../components/buttons/SaveButton/SaveButton';
import ConfirmDbPathChangeModel from '../../../../../components/modals/ConfirmDbPathChangeModel/ConfirmDbPathChangeModel';
import ManualBackupSelector from './ManualBackupSelector/ManualBackupSelector';
import SelectWithLabel from '../../../../../components/SelectWithLabel/SelectWithLabel';
import CheckboxWithLabel from '../../../../../components/CheckboxWithLabel/CheckboxWithLabel';
import Divider from '../../../../../components/Divider/Divider';
import TitleTypography from '../../../../../components/Typographies/TitleTypography';
import FileSelector from '../../../../../components/FileSelector/FileSelector';

// SERVICES
import { selectFolderDialog, saveToFileDialog } from '../../../../../services/electronDialogs.svc';
import { dbIndependentBackup } from '../../../../../services/dbBackup.svc';

// ACTIONS
import { saveSettings, updateSettings } from '../../../../../redux/actions/settingsActions';
import { initializeRegisteredBackups } from '../../../../../redux/actions/registeredBackupsActions';
import { showModal } from '../../../../../redux/actions/modalActions';
import { setDirty } from '../../../../../redux/actions/goodByeActions';

// TOASTS
import { toastManager } from '../../../../../toasts/toastManager';

const SETTINGS_NAME = "db_backup";

const HOURS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

const BackupContainer = () => {

  const dispatch = useDispatch();

  // state
  const settings = useSelector(store => store.settings.data[SETTINGS_NAME]);

  const [data, setData] = useState(settings);

  const save = async (event) => {
    event.stopPropagation();

    const dataCopy = { ...data };
    dataCopy.restart_required = true;

    dispatch(updateSettings(SETTINGS_NAME, dataCopy))
    dispatch(saveSettings(SETTINGS_NAME, dataCopy)).then(() => {
      dispatch(setDirty(false));
    });
  }

  const onBackupOnExitChange = (event) => {
    const { checked } = event.target;

    setData({
      ...data,
      backup_on_exit: checked
    });
    dispatch(setDirty());
  }

  const onByTimeChange = (event) => {
    const { checked } = event.target;
    setData({
      ...data,
      byTime: {
        ...data.byTime,
        enabled: checked
      }
    });
    dispatch(setDirty());
  }

  const onHourChange = (event) => {
    const { value } = event.target;
    setData({
      ...data,
      byTime: {
        ...data.byTime,
        every_x_hours: Number.parseInt(value)
      }
    });
    dispatch(setDirty());
  }

  const onDayMaxAllowedBackups = (event) => {
    const { value } = event.target;
    setData({
      ...data,
      byTime: {
        ...data.byTime,
        day_max_allowed_backups: value
      }
    });
    dispatch(setDirty());
  }

  const backupsToSaveChangeHandler = (event) => {
    const { value } = event.target;
    const backups_to_save = value;

    setData({
      ...data,
      backups_to_save
    });
    dispatch(setDirty());
  }

  const dbSelectFolderHandler = (name) => {
    const options = {
      defaultPath: data.path
    }
    selectFolderDialog(options).then(({ canceled, filePaths }) => {
      if (!canceled) {
        if (data.path !== filePaths[0]) {
          dispatch(
            showModal(ConfirmDbPathChangeModel, {
              onAgreeHandler: () => {
                const newPath = filePaths[0];
                setData({
                  ...data,
                  path: newPath
                });

                dispatch(setDirty());
                dispatch(initializeRegisteredBackups()).catch((result) => {
                  toastManager.error(result.error);
                });
              }
            }) // end show modal
          ); // end dispatch
        } // end if
      } // end if
    }); //end selectFolderDialog
  }

  const dbIndependentBackupHandler = () => {

    const currentDate = new Date();

    const fileName = `ramot-group-db-backup-${currentDate.getDay()}-${currentDate.getDate()}-${currentDate.getFullYear()}.sqlite`;

    saveToFileDialog(fileName, undefined).then(({ canceled, filePath }) => {
      if (!canceled) {
        dbIndependentBackup(filePath)
          .then(() => {
            toastManager.success("ייצוא בסיס הנתונים הסתיים בהצלחה.");
          });
      }
    });

  }

  //to render the last update of the backup
  //const BackupDateTime = new Date(data.last_update);
  //const backupDateRender = `${BackupDateTime.getDate()}/${BackupDateTime.getMonth() + 1}/${BackupDateTime.getFullYear()}`;
  //const backupTimeRender = `${BackupDateTime.getHours()}:${BackupDateTime.getMinutes()}`;

  let backups_to_save = [];
  for (let i = 1; i <= data.max_num_of_history_backups; i++) {
    backups_to_save.push(<MenuItem value={i} key={i}>{i}</MenuItem>)
  }

  const renderHourItems = HOURS.map((value, index) => {
    return <MenuItem value={value} key={index}>{value}</MenuItem>
  });

  return (
    <StyledExpandableSection
      title={"גיבוי בסיס נתונים"}
      TitleIcon={Backup}
      extraDetails={() =>
        <SaveButton onClick={save}>שמור</SaveButton>
      }
      padding={"30px 20px"}
      iconColor={"#0365a2"}
    >

      {/* <Typography className={styles.dbLastUpdate} variant="subtitle1">{`גיבוי אחרון בוצע בתאריך ${backupDateRender} ובשעה ${backupTimeRender}`}</Typography> */}

      <TitleTypography>
        כללי:
        </TitleTypography>

      <CheckboxWithLabel label="גיבוי ביציאה" value={data.backup_on_exit} onChange={onBackupOnExitChange} />

      <TitleTypography underline={false} gutterBottom="10px">
        תיקיית גיבויים:
        </TitleTypography>

      <FileSelector onChangeClick={dbSelectFolderHandler} value={data.db_backups_folder_path} />

      <Divider margin="40px 0 20px" />

      <TitleTypography>
        הגדרות גיבוי:
        </TitleTypography>

      <CheckboxWithLabel label="גיבוי לפי זמן" value={data.byTime.enabled} onChange={onByTimeChange} />

      <SelectWithLabel
        label="כל כמה שעות לבצע בדיקה:"
        value={data.byTime.every_x_hours}
        onChange={onHourChange}
        disabled={!data.byTime.enabled}
      >
        {renderHourItems}
      </SelectWithLabel>

      <SelectWithLabel
        label="כמות גיבויים ליום:"
        value={data.byTime.day_max_allowed_backups}
        onChange={onDayMaxAllowedBackups}
        disabled={!data.byTime.enabled}
      >
        {/* use the same list*/}
        {renderHourItems}
      </SelectWithLabel>

      <SelectWithLabel
        label="כמות גיבויים לשמירה:"
        onChange={backupsToSaveChangeHandler}
        value={data.backups_to_save}
        disabled={!data.byTime.enabled}
      >
        {backups_to_save}
      </SelectWithLabel>

      <Divider />

      <TitleTypography>
        אחר:
        </TitleTypography>

      <ManualBackupSelector onClick={dbIndependentBackupHandler} />

    </StyledExpandableSection >
  );
}

export default memo(BackupContainer);