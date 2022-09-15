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
import { checkForBackupsInFolder } from "../../../../../redux/actions/registeredBackupsActions";
import { setDirty } from "../../../../../redux/actions/routerPromptActions";
import { toastManager } from "../../../../../toasts/toastManager";
import useModalLogic from "../../../../../customHooks/useModalLogic";
import Note from "../../../../../components/Note/Note";
import BackupIcon from "../../../../../components/Icons/BackupIcon";
import { openItem } from "../../../../../services/mainProcess.svc";

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
  const settings = useSelector((store) => store.settings.data);
  const [data, setData] = useState(settings);

  const { db_backup } = data;

  const save = async (event) => {
    event.stopPropagation();

    const dataCopy = { ...data };
    dataCopy.db_backup.restart_required = true;

    dispatch(updateSettings(dataCopy));

    dispatch(saveSettings()).then(() => {
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

  const dbSelectFolderHandler = () => {
    const options = {
      defaultPath: db_backup.db_backups_folder_path
    };
    selectFolderDialog(options).then(({ canceled, filePaths }) => {
      if (canceled) return;

      if (db_backup.db_backups_folder_path !== filePaths[0]) {
        const modalProps = {
          onAgreeHandler: () => {
            const newPath = filePaths[0];
            setData((prev) => ({
              ...prev,
              db_backup: {
                ...prev.db_backup,
                db_backups_folder_path: newPath
              },
              locations: {
                ...prev.locations,
                db_backups_folder_path: newPath
              }
            }));

            dispatch(setDirty());
            dispatch(checkForBackupsInFolder(newPath));
          }
        };

        showModal(ConfirmDbPathChangeModel, modalProps);
      }
    });
  };

  const dbIndependentBackupHandler = () => {
    const date = new Date();

    const fileName = `ramot-group-backup-D-${date.getDate()}-${
      date.getMonth() + 1
    }-${date.getFullYear()}-T-${date.getHours()}-${date.getMinutes()}-${date.getSeconds()}`;

    let diaogOptions = {
      filters: [{ name: "Zip", extensions: ["zip"] }]
    };

    saveToFileDialog(fileName, diaogOptions).then(({ canceled, filePath }) => {
      if (!canceled) {
        dbIndependentBackup(filePath).then(() => {
          toastManager.success("גיבוי לקובץ zip בוצע בהצלחה");
        });
      }
    });
  };

  let backups_to_save = [];
  for (let i = 1; i <= db_backup.max_num_of_history_backups; i++) {
    backups_to_save.push(
      <MenuItem value={i} key={i}>
        {i}
      </MenuItem>
    );
  }

  const openFolder = () => openItem(db_backup.db_backups_folder_path, true);

  return (
    <SettingsExpandableSection
      title={"גיבוי בסיס נתונים והגדרות"}
      Icon={BackupIcon}
      onSaveClick={save}
    >
      {db_backup.last_update && (
        <LastUpdated last_update={db_backup.last_update} />
      )}

      <TitleTypography>כללי:</TitleTypography>

      <CheckboxWithLabel
        mb="20px"
        label="גיבוי ביציאה"
        checked={db_backup.backup_on_exit}
        onChange={onBackupOnExitChange}
      />

      <TitleTypography underline={false} gutterBottom="10px" gutterTop="20px">
        תיקיית גיבויים:
      </TitleTypography>

      <FileSelector
        onChangeClick={dbSelectFolderHandler}
        onOpenClick={openFolder}
        value={db_backup.db_backups_folder_path}
      />

      <Divider margin="40px 0 20px" />

      <TitleTypography>אחר:</TitleTypography>

      <ManualBackupSelector onClick={dbIndependentBackupHandler} />
    </SettingsExpandableSection>
  );
};

export default memo(BackupContainer);
