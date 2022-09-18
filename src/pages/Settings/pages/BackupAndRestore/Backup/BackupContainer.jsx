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
  fetchSettings,
  saveSettings,
  updateSettings
} from "../../../../../redux/actions/settingsActions";
import {
  checkForBackupsInFolder,
  initializeRegisteredBackups,
  registerOldBackups
} from "../../../../../redux/actions/registeredBackupsActions";
import { setDirty } from "../../../../../redux/actions/routerPromptActions";
import { toastManager } from "../../../../../toasts/toastManager";
import useModalLogic from "../../../../../customHooks/useModalLogic";
import Note from "../../../../../components/Note/Note";
import BackupIcon from "../../../../../components/Icons/BackupIcon";
import { openItem } from "../../../../../services/mainProcess.svc";
import ConfirmBackupsRestore from "../../../../../components/modals/ConfirmBackupsRestore/ConfirmBackupsRestore";
import { useEffect } from "react";
import useIsMounted from "../../../../../customHooks/useIsMounted";
import { ipcRenderer } from "electron";

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
  const isMounted = useIsMounted();

  const settings = useSelector((store) => store.settings.data);
  const [settingsData, setSettingsData] = useState(settings);
  const [initBackupsFolder, setInitBackupsFolder] = useState(false);
  const [restoreOldBackups, setRestoreOldBackups] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const { db_backup } = settingsData;

  useEffect(() => {
    if (refresh) {
      dispatch(fetchSettings());
    }
  }, [dispatch, refresh]);

  useEffect(() => {
    if (isMounted()) {
      setSettingsData(settings);
      setRefresh(false);
    }
  }, [settings, isMounted]);

  const saveEventHandler = async (event) => {
    event.stopPropagation();
    const dataCopy = { ...settingsData };
    dataCopy.db_backup.restart_required = true;

    if (initBackupsFolder) dataCopy.db_backup.last_update = "";

    await dispatch(updateSettings(dataCopy));
    await dispatch(saveSettings());
    await dispatch(setDirty(false));

    if (initBackupsFolder) {
      await dispatch(initializeRegisteredBackups());
      setInitBackupsFolder(false);
    }

    if (restoreOldBackups) {
      setRestoreOldBackups(false);
      await registerOldBackups();
    }

    // to re-update backups list in restore component
    if (initBackupsFolder || restoreOldBackups) {
      setRefresh(true);
      ipcRenderer.send("refresh-renderer");
    }
  };

  const updatePaths = (path) => {
    setSettingsData((prev) => ({
      ...prev,
      db_backup: {
        ...prev.db_backup,
        db_backups_folder_path: path
      },
      locations: {
        ...prev.locations,
        db_backups_folder_path: path
      }
    }));
  };

  const dbBackupsFolderChangedHandler = async (oldPath, newPath) => {
    const { success, data } = await checkForBackupsInFolder(newPath);

    if (!success) {
      const ConfirmDbPathChangeModelProps = {
        onAgreeHandler: () => {
          setInitBackupsFolder(true);
          dispatch(setDirty());
        },
        onCancelHandler: () => {
          updatePaths(oldPath);
          dispatch(setDirty(false));
        }
      };

      showModal(ConfirmDbPathChangeModel, ConfirmDbPathChangeModelProps);

      return;
    }

    const ConfirmBackupsRestoreProps = {
      onAgreeHandler: () => {
        setRestoreOldBackups(true);
        dispatch(setDirty());
      },
      onCancelHandler: () => {
        setInitBackupsFolder(true);
        dispatch(setDirty());
      },
      data
    };

    showModal(ConfirmBackupsRestore, ConfirmBackupsRestoreProps);
  };

  const onBackupOnExitChange = (event) => {
    const { checked } = event.target;

    setSettingsData((prev) => ({
      ...prev,
      db_backup: {
        ...prev.db_backup,
        backup_on_exit: checked
      }
    }));
    dispatch(setDirty());
  };

  const dbSelectFolderHandler = () => {
    const options = {
      defaultPath: db_backup.db_backups_folder_path
    };
    selectFolderDialog(options).then(({ canceled, filePaths }) => {
      if (canceled) return;

      if (db_backup.db_backups_folder_path !== filePaths[0]) {
        const newPath = filePaths[0];

        updatePaths(newPath);

        dbBackupsFolderChangedHandler(
          db_backup.db_backups_folder_path,
          newPath
        );
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
      onSaveClick={saveEventHandler}
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
