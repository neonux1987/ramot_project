// LIBRARIES
import React, { useState, memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Typography, MenuItem } from '@material-ui/core';
import { Backup } from '@material-ui/icons';
import GoodBye from 'react-goodbye';

// CSS
import styles from './BackupContainer.module.css';

// COMPONENTS
import StyledExpandableSection from '../../../../../components/Section/StyledExpandableSection';
import SaveButton from '../../../../../components/SaveButton/SaveButton';
import ConfirmDbPathChangeModel from '../../../../../components/modals/ConfirmDbPathChangeModel/ConfirmDbPathChangeModel';
import LeaveWithoutSavingModal from '../../../../../components/modals/LeaveWithoutSavingModal/LeaveWithoutSavingModal';
import BackupFolderSelector from './BackupFolderSelector/BackupFolderSelector';
import ManualBackupSelector from './ManualBackupSelector/ManualBackupSelector';
import SelectWithLabel from '../../../../../components/SelectWithLabel/SelectWithLabel';
import BackupOnExit from '../../../../../components/CheckboxWithLabel/BackupOnExit';

// SERVICES
import { selectFolderDialog, saveToFileDialog } from '../../../../../services/electronDialogs.svc';
import { dbIndependentBackup } from '../../../../../services/dbBackup.svc';

// ACTIONS
import { saveSettings, updateSettings } from '../../../../../redux/actions/settingsActions';
import { initializeRegisteredBackups } from '../../../../../redux/actions/registeredBackupsActions';
import { showModal } from '../../../../../redux/actions/modalActions';

// TOASTS
import { myToaster } from '../../../../../Toasts/toastManager';
import ToastRender from '../../../../../components/ToastRender/ToastRender';

const SETTINGS_NAME = "db_backup";

const HOURS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

const BackupContainer = () => {

  const dispatch = useDispatch();

  // state
  const settings = useSelector(store => store.settings.data[SETTINGS_NAME]);

  const [data, setData] = useState(settings);

  const [dirty, setDirty] = useState(false);

  const save = async (event) => {
    event.stopPropagation();

    const dataCopy = { ...data };
    dataCopy.restartRequired = true;

    dispatch(updateSettings(SETTINGS_NAME, dataCopy))
    dispatch(saveSettings(SETTINGS_NAME, dataCopy)).then(() => {
      setDirty(false);
    });
  }

  const onBackupOnExitChange = (event) => {
    const { checked } = event.target;

    setData({
      ...data,
      backup_on_exit: checked
    });
    setDirty(true);
  }

  const onHourChange = (event) => {
    const { value } = event.target;
    setData({
      ...data,
      every_x_hours: Number.parseInt(value)
    });
    setDirty(true);
  }

  const backupsToSaveChangeHandler = (event) => {
    const { value } = event.target;
    const backups_to_save = value;

    setData({
      ...data,
      backups_to_save
    });
    setDirty(true);
  }

  const dbSelectFolderHandler = () => {
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
                setDirty(true);
                dispatch(initializeRegisteredBackups()).catch((result) => {
                  myToaster.error(result.error);
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

        //backup started message
        const toastId = myToaster.info(<ToastRender spinner={true} message={"מבצע גיבוי בסיס נתונים..."} />, {
          autoClose: false
        });

        dbIndependentBackup(filePath)
          .then(() => {
            //send the error to the notification center
            myToaster.success(<ToastRender done={true} message={"גיבוי בסיס הנתונים הסתיים בהצלחה."} />, {
              delay: 2000,
              autoClose: 3000,
              onOpen: () => {
                myToaster.dismiss(toastId);
              }
            });
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

      {settings.enabled && settings.restartRequired && <Typography className={styles.restartRequired} variant="subtitle1">
        {"*לאחר ביצוע שינויים נדרש לאתחל את השירות בלשונית שירותי מערכת."}
      </Typography>}

      <BackupOnExit value={data.backup_on_exit} onChange={onBackupOnExitChange} />

      <SelectWithLabel
        label="כל כמה שעות לבצע בדיקה:"
        value={data.every_x_hours}
        onChange={onHourChange}
      >
        {renderHourItems}
      </SelectWithLabel>

      <SelectWithLabel
        label="בחר כמה גיבויים לשמור לאחור:"
        onChange={backupsToSaveChangeHandler}
        value={data.backups_to_save}
      >
        {backups_to_save}
      </SelectWithLabel>

      <BackupFolderSelector path={data.path} onClick={dbSelectFolderHandler} />

      <ManualBackupSelector onClick={dbIndependentBackupHandler} />

      <GoodBye when={dirty}>
        {({ isShow, handleOk, handleCancel }) =>
          isShow && (
            <LeaveWithoutSavingModal onAgreeHandler={handleOk} onCancelHandler={handleCancel} />
          )
        }
      </GoodBye>

    </StyledExpandableSection >
  );
}

export default memo(BackupContainer);