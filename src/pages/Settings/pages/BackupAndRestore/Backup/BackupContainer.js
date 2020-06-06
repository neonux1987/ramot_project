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
// SERVICES
import { selectFolderDialog, saveToFileDialog } from '../../../../../services/electronDialogs.svc';

// ACTIONS
import {
  saveSettings,
  updateSettings
} from '../../../../../redux/actions/settingsActions';
import {
  initializeRegisteredBackups
} from '../../../../../redux/actions/registeredBackupsActions';
import { showModal } from '../../../../../redux/actions/modalActions';

// SERVICES
import { dbIndependentBackup } from '../../../../../services/dbBackup.svc';

// TOASTS
import { myToaster } from '../../../../../Toasts/toastManager';
import ToastRender from '../../../../../components/ToastRender/ToastRender';
import DaysOfWeekSelector from './DaysOfWeekSelector/DaysOfWeekSelector';
import NumOfBackupsSelector from './NumOfBackupsSelector/NumOfBackupsSelector';
import BackupFolderSelector from './BackupFolderSelector/BackupFolderSelector';
import TimeSelector from './TimeSelector/TimeSelector';
import ManualBackupSelector from './ManualBackupSelector/ManualBackupSelector';


const SETTINGS_NAME = "db_backup";

const BackupContainer = () => {

  const dispatch = useDispatch();

  // state
  const settings = useSelector(store => store.settings.data[SETTINGS_NAME]);

  const [data, setData] = useState(settings);

  const [dirty, setDirty] = useState(false);

  const save = async (event) => {
    event.stopPropagation();

    //the init that it's not valid
    let valid = isDaysOfWeekValid(data.days_of_week);
    //if the backup is active and noValid is true
    //based on the no days were selected
    if (!valid && data.active) {
      //send the error to the notification center
      myToaster.error("חייב לבחור לפחות יום אחד.");
    } else {
      const dataCopy = { ...data };
      dataCopy.restartRequired = true;

      dispatch(updateSettings(SETTINGS_NAME, dataCopy))
      dispatch(saveSettings(SETTINGS_NAME, dataCopy)).then(() => {
        setDirty(false);
      });
    }
  }

  // validation
  const isDaysOfWeekValid = (days_of_week) => {
    //get the keys of the object
    const keys = Object.keys(days_of_week);
    //the init that it's not valid
    let notValid = true;
    //if at least on of the days
    //is checked, then it's valid and notValid should be false
    for (let i = 0; i < keys.length; i++) {
      if (days_of_week[keys[i]]) {
        notValid = false;
      }
    }
    //if the backup is active and noValid is true
    //based on the no days were selected
    if (notValid) {
      return false;
    } else {
      return true;
    }
  }

  const onDbTimeChange = (value) => {
    //must convert it to string to ensure electron won't change it to different time zone
    let date = new Date(value);
    const localeString = date.toLocaleString();
    date = new Date(localeString);

    const time = date.toString();

    setData({
      ...data,
      time
    });
    setDirty(true);
  }

  const onDbDayChange = (event) => {
    const { name, checked } = event.target;
    const keys = Object.keys(data.days_of_week);

    const dataCopy = { ...data };

    if (name === "everything" && checked === true) {
      for (let i = 0; i < keys.length; i++) {
        dataCopy.days_of_week[keys[i]] = true;
      }
    } else if (name === "everything" && checked === false) {
      const keys = Object.keys(dataCopy.days_of_week);
      for (let i = 0; i < keys.length; i++) {
        dataCopy.days_of_week[keys[i]] = false;
      }
    }
    else {
      dataCopy.days_of_week = {
        ...dataCopy.days_of_week,
        [name]: checked,//set the selected day
        everything: checked ? dataCopy.days_of_week["everything"] : false
      };

      let fullDays = true;
      //iterate and find if all days are selected
      for (let i = 0; i < keys.length; i++) {
        if (!dataCopy.days_of_week[keys[i]] && keys[i] !== "everything") {
          fullDays = false;
        }
      }
      //if all the days selected then select everything checkbox
      if (fullDays) {
        dataCopy.days_of_week["everything"] = true
      }

    }

    setData(dataCopy);
    setDirty(true);
  }

  const onCheckBoxChange = (event) => {

    const { name, checked } = event.target;

    if (checked && name === "byTime")
      setData({
        ...data,
        byHour: false,
        byTime: true
      });
    else if (checked && name === "byHour")
      setData({
        ...data,
        byHour: true,
        byTime: false
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

      <TimeSelector
        time={data.time}
        every_x_hours={data.every_x_hours}
        byHour={data.byHour}
        byTime={data.byTime}
        onTimeChange={onDbTimeChange}
        onCheckBoxChange={onCheckBoxChange}
        onHourChange={onHourChange}
      />

      <NumOfBackupsSelector onChange={backupsToSaveChangeHandler} numOfBackups={data.backups_to_save}>
        {backups_to_save}
      </NumOfBackupsSelector>

      <DaysOfWeekSelector onChange={onDbDayChange} daysOfWeek={data.days_of_week} />

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