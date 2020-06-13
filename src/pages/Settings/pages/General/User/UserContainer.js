// LIBRARIES
import React, { useState } from 'react';
import { Android } from '@material-ui/icons';
import { useSelector, useDispatch } from 'react-redux';

// COMPONENTS
import StyledExpandableSection from '../../../../../components/Section/StyledExpandableSection';
import SaveButton from '../../../../../components/SaveButton/SaveButton';
import FileSelector from '../../../../../components/FileSelector/FileSelector';
import TitleTypography from '../../../../../components/Typographies/TitleTypography';

// ACTIONS
import { updateSettings, saveSettings } from '../../../../../redux/actions/settingsActions';

// SERVICES
import { selectFolderDialog } from '../../../../../services/electronDialogs.svc';

// ACTIONS
import { setDirty } from '../../../../../redux/actions/goodByeActions';

const SETTINGS_NAME = "user";

export default () => {
  const dispatch = useDispatch();

  const { user, locations } = useSelector(store => store.settings.data);

  const settings = user;

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

          dispatch(updateSettings("locations", {
            ...locations,
            reports_folder_path: newPath
          }));

          dispatch(setDirty());
        } // end if
      } // end if
    }); //end selectFolderDialog
  }

  return (
    <StyledExpandableSection
      title={"משתמש"}
      TitleIcon={Android}
      iconColor={"#0365a2"}
      extraDetails={() => <SaveButton onClick={save}>שמור</SaveButton>}
      padding={"30px 20px"}
    >

      <TitleTypography>
        מיקום תיקיית דוחות אקסל:
      </TitleTypography>

      <FileSelector onClick={dbSelectFolderHandler} value={reports_folder_path} />

    </StyledExpandableSection >
  );
}