import React from "react";
import {
  container,
  chooseFileWrapper,
  chosenfile
} from "./RestoreFromFile.module.css";
import WhiteButton from "../../../../../../components/buttons/WhiteButton";
import CloseIcon from "../../../../../../components/Icons/CloseIcon";
import RadioWithLabel from "../../../../../../components/Radio/RadioWithLabel";

const RestoreFromFile = (props) => {
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
        <RadioWithLabel
          label="שיחזור מתוך קובץ גיבוי zip שנמצא במחשבך:"
          checked={byFile}
          onChange={onCheckBoxChangeHandler}
          name="byFile"
        />

        <WhiteButton disabled={!byFile} onClick={selectDbFileHandler}>
          בחר קובץ גיבוי
        </WhiteButton>
      </div>

      {selectedFile && (
        <div className={chosenfile}>
          <WhiteButton onClick={initSelectedFile} style={{ minWidth: 0 }}>
            <CloseIcon color="red" width="16px" height="16px" />
          </WhiteButton>
          {`נבחר קובץ ${selectedFile}`}
        </div>
      )}
    </div>
  );
};

export default RestoreFromFile;
