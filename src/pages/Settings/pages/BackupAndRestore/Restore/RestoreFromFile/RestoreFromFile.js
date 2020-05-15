import React from 'react';
import { Button, Checkbox } from '@material-ui/core';
import {
  container,
  chooseFileWrapper,
  chosenfile,
  chooseFileButton
} from './RestoreFromFile.module.css';
import SubtitleBoldTypography from '../../../../../../components/Typographies/SubtitleBoldTypography';

export default props => {

  const {
    selectDbFileHandler,
    selectedFile = "mezach.sqlite3",
    byFile,
    onCheckBoxChangeHandler
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

        <Button className={chooseFileButton} variant="contained" color="primary" onClick={selectDbFileHandler}>בחר קובץ גיבוי</Button>
      </div>

      {selectedFile && <div className={chosenfile}>
        {`נבחר קובץ ${selectedFile}`}
      </div>}

    </div>
  );
}