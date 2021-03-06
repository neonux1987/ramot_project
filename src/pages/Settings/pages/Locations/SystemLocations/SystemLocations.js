// LIBRARIES
import React from 'react';
import { Box, Typography, Divider, TextField } from '@material-ui/core';
import { InsertDriveFile } from '@material-ui/icons';

// CSS
import styles from './SystemLocations.module.css';

// COMPONENTS
import StyledExpandableSection from '../../../../../components/Section/StyledExpandableSection';
import SaveButton from '../../../../../components/buttons/SaveButton/SaveButton';
import FileSelector from '../../../../../components/FileSelector/FileSelector';

export default (props) => {

  const {
    data,
    openFileInFolder,
    saveHandler
  } = props;

  const {
    db_file_path,
    config_folder_path,
    config_file_path
  } = data;

  return (
    <StyledExpandableSection
      title={"מיקום קבצי מערכת"}
      TitleIcon={InsertDriveFile}
      iconColor={"#0365a2"}
      extraDetails={() =>
        <SaveButton onClick={saveHandler}>שמור</SaveButton>
      }
      padding={"30px 20px"}
    >

      <form className={styles.form} onChange={(event) => this.formOnChange(event)} onSubmit={(event) => event.preventDefault()}>

        <Typography variant="subtitle1">
          <Box fontWeight="600">
            מיקום בסיס הנתונים
          </Box>
        </Typography>

        <Typography variant="subtitle2" className={styles.headerTitle}>
          מיקום התיקיה שבה נמצא בסיס הנתונים שבשימוש המערכת. (לא ניתן לשנות את המיקום שלו)
        </Typography>


        <FileSelector onClick={() => openFileInFolder(db_file_path)} value={db_file_path} />

        <Divider className={styles.divider} />

        <Typography variant="subtitle1" className={styles.headerTitle}>
          <Box fontWeight="600">
            מיקום קבצי הגדרות
          </Box>
        </Typography>

        <FileSelector onClick={() => openFileInFolder(config_file_path)} value={config_folder_path} />

      </form>

    </StyledExpandableSection >
  );
}