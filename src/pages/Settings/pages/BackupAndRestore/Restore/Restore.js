// LIBRARIES
import React, { useEffect, Fragment, useState } from 'react';
import { Button, Typography, MenuItem } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { Restore } from '@material-ui/icons';

// CSS
import {
  restoreButton
} from './Restore.module.css';

// COMPONENTS
import StyledExpandableSection from '../../../../../components/Section/StyledExpandableSection';
import Separator from '../../../../../components/Seperator/Separator';
import RestoreFromList from './RestoreFromList/RestoreFromList';
import RestoreFromFile from './RestoreFromFile/RestoreFromFile';

// ACTIONS
import {
  fetchRegisteredBackups
} from '../../../../../redux/actions/registeredBackupsActions';

// LOADERS
import DefaultLoader from '../../../../../components/AnimatedLoaders/DefaultLoader';

// SERVICES
import { selectFileDialog } from '../../../../../services/electronDialogs.svc';
import { restore } from '../../../../../services/restoreDbService';
import { myToasts } from '../../../../../CustomToasts/myToasts';
import useModalLogic from '../../../../../customHooks/useModalLogic';
import ConfirmDbRestoreModal from '../../../../../components/modals/ConfirmDbRestoreModal/ConfirmDbRestoreModal';


const NO_BACKUPS_MESSAGE = "לא קיימים גיבויים שמורים";

export default () => {

  const dispatch = useDispatch();

  const { showModal } = useModalLogic();

  const { isFetching, data } = useSelector(store => store.registeredBackups);

  const [selectedBackupDate, setSelectedBackupDate] = useState("");

  const [selectedFile, setSelectedFile] = useState(null);

  const [checkBoxValue, setCheckBoxValue] = useState({
    byList: true,
    byFile: false
  })

  useEffect(() => {
    dispatch(fetchRegisteredBackups()).then(({ data }) => {
      if (data.length === 0)
        setSelectedBackupDate(NO_BACKUPS_MESSAGE);
      else
        setSelectedBackupDate(data[0].fileName);
    });
  }, [dispatch]);

  const backupsNamesRender = data.length > 0 ? data.map((backup, index) => {
    const date = new Date(backup.backupDateTime);
    const locale = date.toLocaleString();
    //to get rid off of the AM or PM
    const newLocaleDateTime = locale.slice(0, locale.length - 3);
    return <MenuItem value={backup.fileName} key={index}>{newLocaleDateTime}</MenuItem>
  }) : <MenuItem value="לא קיימים גיבויים שמורים" disabled>
      לא קיימים גיבויים
</MenuItem>;

  const onBackupDateChangeHandler = (event) => {
    const { value } = event.target;
    setSelectedBackupDate(value);
  }

  const selectDbFileHandler = () => {
    selectFileDialog().then(({ canceled, filePaths }) => {
      if (!canceled) {
        setSelectedFile(filePaths[0]);
      } // end if
    }); //end selectFolderDialog
  }

  const onCheckBoxChangeHandler = (event) => {
    const { name, checked } = event.target;

    if (name === "byList")
      setCheckBoxValue({
        byFile: false,
        byList: checked
      });
    else
      setCheckBoxValue({
        byList: false,
        byFile: checked
      });
  };

  const restoreHandler = () => {
    const { byList, byFile } = checkBoxValue;

    // if the byList is checked then set the file name
    // from the list, otherwise byFile is checked so
    // set the name of the user selected file 
    const payload = byList ? selectedBackupDate : selectedFile;

    if (byFile && selectedFile === null)
      myToasts.error("לא נבחר קובץ")
    else {
      showModal(ConfirmDbRestoreModal, {
        onAgreeHandler: () => restore(payload, byList)
      });
    }

  };

  const initSelectedFile = () => setSelectedFile(null);

  const render = isFetching ?
    <DefaultLoader loading={isFetching} />
    :
    <Fragment>

      {/* <Typography className={styles.restoreLastUpdate} variant="subtitle1">{`גיבוי אחרון בוצע ב- ${12321}`}</Typography> */}

      <RestoreFromList
        onBackupDateChangeHandler={onBackupDateChangeHandler}
        selectedBackupDate={selectedBackupDate}
        backupsNamesRender={backupsNamesRender}
        onCheckBoxChangeHandler={onCheckBoxChangeHandler}
        byList={checkBoxValue.byList}
      />

      <Separator title={"או"} />

      <RestoreFromFile
        selectDbFileHandler={selectDbFileHandler}
        selectedFile={selectedFile}
        onCheckBoxChangeHandler={onCheckBoxChangeHandler}
        byFile={checkBoxValue.byFile}
        initSelectedFile={initSelectedFile}
      />

      <Typography variant="body2">
        *לתשומת ליבך, לפני ביצוע שיחזור אנא גבה את בסיס הנתונים באופן ידני למקרה חירום.
    </Typography>

      <Button className={restoreButton} variant="contained" color="primary" onClick={restoreHandler}>בצע שיחזור</Button>
    </Fragment>

  return (

    <StyledExpandableSection
      title={"שיחזור בסיס נתונים"}
      TitleIcon={Restore}
      iconBoxBg={"#1b966e"}
      padding={"30px 20px"}
    >
      {render}
    </StyledExpandableSection>
  );
}