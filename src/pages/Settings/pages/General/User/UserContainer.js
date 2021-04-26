// LIBRARIES
import React, { useState } from 'react';
import { AccessibilityNew } from '@material-ui/icons';
import { useSelector, useDispatch } from 'react-redux';

// COMPONENTS
import SettingsExpandableSection from '../../../../../components/Section/SettingsExpandableSection/SettingsExpandableSection';
import FileSelector from '../../../../../components/FileSelector/FileSelector';
import TitleTypography from '../../../../../components/Typographies/TitleTypography';

// ACTIONS
import { updateSettings, saveSettings } from '../../../../../redux/actions/settingsActions';

// SERVICES
import { selectFolderDialog } from '../../../../../services/electronDialogs.svc';
import { openItem } from '../../../../../services/mainProcess.svc';

// ACTIONS
import { setDirty } from '../../../../../redux/actions/goodByeActions';


const SETTINGS_NAME = "user";

const UserContainer = () => {
  const dispatch = useDispatch();

  const settings = useSelector(store => store.settings.data[SETTINGS_NAME]);

  const [data, setData] = useState(settings);

  const {
    reports_folder_path
  } = data;

  const save = async (event) => {
    event.stopPropagation();

    const dataCopy = { ...data };

    dispatch(updateSettings(SETTINGS_NAME, dataCopy));

    dispatch(saveSettings(SETTINGS_NAME, dataCopy)).then(() => {
      dispatch(setDirty(false));
    });
  }

  const dbSelectFolderHandler = () => {
    const options = {
      defaultPath: reports_folder_path
    }
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
  }

  return (
    <SettingsExpandableSection
      title={"משתמש"}
      Icon={AccessibilityNew}
      onSaveClick={save}
    >

      <TitleTypography underline={false} gutterBottom="10px">
        מיקום תיקיית דוחות אקסל:
      </TitleTypography>

      <FileSelector onChangeClick={dbSelectFolderHandler} onOpenClick={() => openItem(reports_folder_path)} value={reports_folder_path} />

    </SettingsExpandableSection >
  );
}

export default UserContainer;