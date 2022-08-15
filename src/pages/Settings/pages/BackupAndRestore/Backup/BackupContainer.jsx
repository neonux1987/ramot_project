import React, { useState, memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MenuItem } from "@material-ui/core";
import SettingsExpandableSection from "../../../../../components/Section/SettingsExpandableSection/SettingsExpandableSection";
import ConfirmDbPathChangeModel from "../../../../../components/modals/ConfirmDbPathChangeModel/ConfirmDbPathChangeModel";
import ManualBackupSelector from "./ManualBackupSelector/ManualBackupSelector";
import CheckboxWithLabel from "../../../../../components/Checkboxes/CheckboxWithLabel";
import Divider from "../../../../../components/Divider/Divider";
import TitleTypography from "../../../../../components/Typographies/TitleTypography";
import FileSelector from "../../../../../components/FileSelector/FileSelector";
import {
  selectFolderDialog,
  saveToFileDialog
} from "../../../../../services/electronDialogs.svc";
import { dbIndependentBackup } from "../../../../../services/dbBackup.svc";
import {
  saveSettings,
  updateSettings
} from "../../../../../redux/actions/settingsActions";
import { initializeRegisteredBackups } from "../../../../../redux/actions/registeredBackupsActions";
import { setDirty } from "../../../../../redux/actions/routerPromptActions";
import { toastManager } from "../../../../../toasts/toastManager";
import useModalLogic from "../../../../../customHooks/useModalLogic";
import Note from "../../../../../components/Note/Note";
import BackupIcon from "../../../../../components/Icons/BackupIcon";

const SETTINGS_NAME = "db_backup";

const LastUpdated = ({ last_update }) => {
  const date = new Date(last_update);
  const formatter = new Intl.DateTimeFormat("he-IL", {
    dateStyle: "short",
    timeStyle: "short"
  });
  const formattedDate = formatter.format(date);

  return (
    <Note text={`גיבוי אחרון בוצע ב- ${formattedDate}`} margin="0 0 20px 0" />
  );
};

const BackupContainer = () => {
  const dispatch = useDispatch();
  const { showModal } = useModalLogic();
  const settings = useSelector((store) => store.settings.data[SETTINGS_NAME]);
  const [data, setData] = useState(settings);

  const save = async (event) => {
    event.stopPropagation();

    const dataCopy = { ...data };
    dataCopy.restart_required = true;

    dispatch(updateSettings(SETTINGS_NAME, dataCopy));
    dispatch(saveSettings(SETTINGS_NAME, dataCopy)).then(() => {
      dispatch(setDirty(false));
    });
  };

  const onBackupOnExitChange = (event) => {
    const { checked } = event.target;

    setData({
      ...data,
      backup_on_exit: checked
    });
    dispatch(setDirty());
  };

  const dbSelectFolderHandler = (name) => {
    const options = {
      defaultPath: data.path
    };
    selectFolderDialog(options).then(({ canceled, filePaths }) => {
      if (canceled) return;

      if (data.path !== filePaths[0]) {
        const modalProps = {
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
        };

        dispatch(showModal(ConfirmDbPathChangeModel, modalProps));
      }
    });
  };

  const dbIndependentBackupHandler = () => {
    const currentDate = new Date();

    const fileName = `ramot-group-db-backup-${currentDate.getDay()}-${currentDate.getDate()}-${currentDate.getFullYear()}.sqlite`;

    saveToFileDialog(fileName, undefined).then(({ canceled, filePath }) => {
      if (!canceled) {
        dbIndependentBackup(filePath).then(() => {
          toastManager.success("ייצוא בסיס הנתונים הסתיים בהצלחה.");
        });
      }
    });
  };

  let backups_to_save = [];
  for (let i = 1; i <= data.max_num_of_history_backups; i++) {
    backups_to_save.push(
      <MenuItem value={i} key={i}>
        {i}
      </MenuItem>
    );
  }

  return (
    <SettingsExpandableSection
      title={"גיבוי בסיס נתונים"}
      Icon={BackupIcon}
      onSaveClick={save}
    >
      {data.last_update && <LastUpdated last_update={data.last_update} />}

      <TitleTypography>כללי:</TitleTypography>

      <CheckboxWithLabel
        label="גיבוי ביציאה"
        checked={data.backup_on_exit}
        onChange={onBackupOnExitChange}
      />

      <TitleTypography underline={false} gutterBottom="10px">
        תיקיית גיבויים:
      </TitleTypography>

      <FileSelector
        onChangeClick={dbSelectFolderHandler}
        value={data.db_backups_folder_path}
      />

      <Divider margin="40px 0 20px" />

      <TitleTypography>אחר:</TitleTypography>

      <ManualBackupSelector onClick={dbIndependentBackupHandler} />
    </SettingsExpandableSection>
  );
};

export default memo(BackupContainer);
