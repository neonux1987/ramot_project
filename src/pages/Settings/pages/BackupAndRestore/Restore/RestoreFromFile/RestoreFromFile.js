import React from 'react';
import { Button } from '@material-ui/core';
import {
  container,
  subtitle,
  chooseFileWrapper,
  chosenfile
} from './RestoreFromFile.module.css';
import SubtitleBoldTypography from '../../../../../../components/Typographies/SubtitleBoldTypography';

export default props => {

  const {
    selectDbFileHandler,
    selectedFile = "mezach.sqlite3"
  } = props;

  return (
    <div className={container}>

      <div className={chooseFileWrapper}>
        <SubtitleBoldTypography className={subtitle}>
          או מתוך קובץ גיבוי שנמצא במחשבך
        </SubtitleBoldTypography>

        <Button style={{ display: "inline-flex" }} variant="contained" color="primary" onClick={selectDbFileHandler}>בחר קובץ גיבוי</Button>
      </div>

      {selectedFile && <div className={chosenfile}>
        {`נבחר קובץ ${selectedFile}`}
      </div>}

    </div>
  );
}