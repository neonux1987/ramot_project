import React from 'react';
import PropTypes from 'prop-types';
import { Select } from '@material-ui/core';
import SubtitleBoldTypography from "../../../../../../components/Typographies/SubtitleBoldTypography";
import styles from './NumOfBackupsSelector.module.css';

const NumOfBackupsSelector = (props) => {

  const {
    numOfBackups = "",
    onChange,
    children
  } = props;

  return (
    <div className={styles.numOfBackupsWrapper}>
      <SubtitleBoldTypography>
        בחר כמה גיבויים לשמור לאחור:
          </SubtitleBoldTypography>

      <Select
        className={styles.numOfBackups}
        value={numOfBackups}
        onChange={onChange}
      >
        {children}
      </Select>
    </div>
  );
}

export default NumOfBackupsSelector;

NumOfBackupsSelector.propTypes = {
  numOfBackups: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  children: PropTypes.array.isRequired
};
