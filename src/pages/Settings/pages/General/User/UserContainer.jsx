import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import SettingsExpandableSection from "../../../../../components/Section/SettingsExpandableSection/SettingsExpandableSection";
import FileSelector from "../../../../../components/FileSelector/FileSelector";
import TitleTypography from "../../../../../components/Typographies/TitleTypography";
import {
  updateSpecificSettings,
  saveSettings
} from "../../../../../redux/actions/settingsActions";
import { selectFolderDialog } from "../../../../../services/electronDialogs.svc";
import { openItem } from "../../../../../services/mainProcess.svc";
import { setDirty } from "../../../../../redux/actions/routerPromptActions";
import UserIcon from "../../../../../components/Icons/UserIcon";

const SETTINGS_NAME = "user";

const UserContainer = () => {
  const dispatch = useDispatch();
  const settings = useSelector((store) => store.settings.data[SETTINGS_NAME]);

  const [data, setData] = useState(settings);

  const { reports_folder_path } = data;

  const save = async (event) => {
    event.stopPropagation();

    const dataCopy = { ...data };

    dispatch(updateSpecificSettings(SETTINGS_NAME, dataCopy));

    dispatch(saveSettings(SETTINGS_NAME, dataCopy)).then(() => {
      dispatch(setDirty(false));
    });
  };

  const dbSelectFolderHandler = () => {
    const options = {
      defaultPath: reports_folder_path
    };
    selectFolderDialog(options).then(({ canceled, filePaths }) => {
      if (!canceled) {
        if (reports_folder_path !== filePaths[0]) {
          const newPath = filePaths[0];

          const dataCopy = { ...data };
          dataCopy["reports_folder_path"] = newPath;

          setData({
            reports_folder_path: newPath
          });

          dispatch(setDirty());
        } // end if
      } // end if
    }); //end selectFolderDialog
  };

  // open folder and ensure the dir exist
  const openFolder = () => openItem(reports_folder_path, true);

  return (
    <SettingsExpandableSection
      title={"משתמש"}
      Icon={UserIcon}
      onSaveClick={save}
    >
      <TitleTypography underline={false} gutterBottom="10px">
        מיקום תיקיית דוחות אקסל:
      </TitleTypography>

      <FileSelector
        onChangeClick={dbSelectFolderHandler}
        onOpenClick={openFolder}
        value={reports_folder_path}
      />
    </SettingsExpandableSection>
  );
};

export default UserContainer;
