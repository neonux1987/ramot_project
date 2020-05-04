import React from 'react';
import SubtitleBoldTypography from "../../../../../../components/Typographies/SubtitleBoldTypography";
import styles from './TimeSelector.module.css';
import { TimePicker } from '@material-ui/pickers';

export default (props) => {

  const {
    time = new Date().toString(),
    onChange
  } = props;

  return (
    <div className={styles.timeWrapper}>
      <SubtitleBoldTypography>
        בחר שעה לביצוע הגיבוי:
        </SubtitleBoldTypography>

      <TimePicker
        ampm={false}
        className={styles.time}
        inputProps={{ className: styles.timeInput }}
        value={time}
        onChange={onChange}
      />
    </div>
  );
}

