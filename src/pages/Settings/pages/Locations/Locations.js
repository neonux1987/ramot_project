// LIBRARIES
import React, { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// ACTIONS
import {
  updateSettings,
  saveSettings
} from '../../../../redux/actions/settingsActions';
import UsersLocations from './UsersLocations/UsersLocations';
import SystemLocations from './SystemLocations/SystemLocations';

// SERVICES
import { selectFolderDialog } from '../../../../services/electronDialogs.svc';
import { showItemInFolder } from '../../../../services/mainProcess.svc';


const SETTINGS_NAME = "locations";

export const General = () => {

  const dispatch = useDispatch();

  // state
  const data = useSelector(store => store.settings.data[SETTINGS_NAME]);

  const save = (event) => {
    event.stopPropagation();
    dispatch(saveSettings(SETTINGS_NAME, data));
  }

  const dbSelectFolderHandler = (name, path) => {
    const options = {
      defaultPath: path
    }
    selectFolderDialog(options).then(({ canceled, filePaths }) => {
      if (!canceled) {
        if (path !== filePaths[0]) {
          const dataCopy = { ...data };
          dataCopy[name] = filePaths[0];
          dispatch(updateSettings(SETTINGS_NAME, dataCopy));
        } // end if
      } // end if
    }); //end selectFolderDialog
  }

  return (
    <Fragment>

      <UsersLocations
        data={data}
        settingsName={SETTINGS_NAME}
        saveHandler={save}
        selectHandler={dbSelectFolderHandler}
      />

      <SystemLocations
        data={data}
        settingsName={SETTINGS_NAME}
        saveHandler={save}
        openFileInFolder={showItemInFolder}
        selectHandler={dbSelectFolderHandler}
      />


    </Fragment>
  );

}


export default General;