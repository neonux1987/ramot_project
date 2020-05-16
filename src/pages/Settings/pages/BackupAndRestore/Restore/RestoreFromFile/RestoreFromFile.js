import React from 'react';
import { Button, Checkbox } from '@material-ui/core';
import { MdClose } from 'react-icons/md';

import {
  container,
  chooseFileWrapper,
  chosenfile,
  chooseFileButton,
  closeButton
} from './RestoreFromFile.module.css';
import SubtitleBoldTypography from '../../../../../../components/Typographies/SubtitleBoldTypography';

export default props => {

  const {
    selectDbFileHandler,
    selectedFile = null,
    byFile,
    onCheckBoxChangeHandler,
    initSelectedFile
  } = props;

  return (
    <div className={container}>

      <div className={chooseFileWrapper}>
        <Checkbox
          checked={byFile}
          onChange={onCheckBoxChangeHandler}
          name="byFile"
          color="primary"
        />

        <SubtitleBoldTypography>
          מתוך קובץ גיבוי שנמצא במחשבך:
        </SubtitleBoldTypography>

        <Button disabled={!byFile} className={chooseFileButton} variant="contained" color="primary" onClick={selectDbFileHandler}>בחר קובץ גיבוי</Button>
      </div>

      {selectedFile && <div className={chosenfile}>
        <Button className={closeButton} onClick={initSelectedFile}>
          <MdClose />
        </Button>
        {`נבחר קובץ ${selectedFile}`}
      </div>}

    </div>
  );
}