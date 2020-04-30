// LIBRARIES
import React from 'react';
import { Box, Button, Typography, TextField } from '@material-ui/core';
import { Backup } from '@material-ui/icons';

// CSS
import styles from './UsersLocations.module.css';

// COMPONENTS
import StyledExpandableSection from '../../../../../components/Section/StyledExpandableSection';
import SaveButton from '../../../../../components/SaveButton/SaveButton';

export default (props) => {

  const {
    data,
    selectHandler,
    saveHandler
  } = props;

  const {
    reports_folder_path,
  } = data;

  return (
    <StyledExpandableSection
      title={"מיקום קבצי משתמש"}
      TitleIcon={Backup}
      iconBoxBg={"#1b966e"}
      extraDetails={() =>
        <SaveButton onClick={saveHandler}>שמור</SaveButton>
      }
      padding={"30px 20px"}
    >

      <form className={styles.form} onChange={(event) => this.formOnChange(event)} onSubmit={(event) => event.preventDefault()}>

        <Typography variant="subtitle1">
          <Box fontWeight="600">
            מיקום תיקיית ייצוא דוחות
          </Box>
        </Typography>

        <Typography variant="subtitle2" className={styles.headerTitle}>
          מיקום התיקייה שאליה המערכת מייצאת את דוחות האקסל.
          אם ברצונך לשנות מיקום זה, לחץ על שנה מיקום.
        </Typography>

        <Button variant="contained" color="primary" onClick={() => selectHandler("reports_folder_path", reports_folder_path)}>שנה מיקום</Button>
        <TextField
          id="outlined-bare"
          disabled
          classes={{ root: styles.dbFileTextFieldLocationWrapper }}
          value={reports_folder_path}
          onChange={() => { }}
          variant="outlined"
          inputProps={{ 'aria-label': 'bare', className: styles.dbFileTextFieldLocationInput }}
        />

      </form>

    </StyledExpandableSection >
  );
}