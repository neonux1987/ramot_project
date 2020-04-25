// LIBRARIES
import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { shell } from 'electron';

// ACTIONS
import {
  fetchSettings,
  updateSettings,
  saveSettings,
  cleanup
} from '../../../../redux/actions/settingsActions';
import UsersLocations from './UsersLocations/UsersLocations';
import SystemLocations from './SystemLocations/SystemLocations';

// SERVICES
import { selectFolderDialog } from '../../../../services/electronDialogs.svc';


const SETTINGS_NAME = "locations";

export const General = () => {

  const dispatch = useDispatch();

  // state
  const settings = useSelector(store => store.settings[SETTINGS_NAME]);

  const {
    isFetching,
    data
  } = settings;

  useEffect(() => {
    dispatch(fetchSettings(SETTINGS_NAME));
    return cleanupStore;
  }, [dispatch, cleanupStore]);

  const cleanupStore = () => {
    dispatch(cleanup(SETTINGS_NAME, data));
  }

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

  const openFileInFolder = (path) => {
    shell.showItemInFolder(path);
  }

  return (
    <Fragment>

      <UsersLocations
        isFetching={isFetching}
        data={data}
        settingsName={SETTINGS_NAME}
        saveHandler={save}
        selectHandler={dbSelectFolderHandler}
      />

      <SystemLocations
        isFetching={isFetching}
        data={data}
        settingsName={SETTINGS_NAME}
        saveHandler={save}
        openFileInFolder={openFileInFolder}
        selectHandler={dbSelectFolderHandler}
      />


    </Fragment>
  );

}


export default General;