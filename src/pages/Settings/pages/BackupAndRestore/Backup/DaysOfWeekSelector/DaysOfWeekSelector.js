import React from 'react';
import { FormControlLabel } from "@material-ui/core";
import SubtitleBoldTypography from "../../../../../../components/Typographies/SubtitleBoldTypography";
import styles from './DaysOfWeekSelector.module.css';
import CheckBoxWithSound from '../../../../../../componentsWithSound/CheckBoxWithSound/CheckBoxWithSound';

export default (props) => {

  const {
    onChange,
    daysOfWeek = []
  } = props;

  return (
    <div className={styles.container}>
      <SubtitleBoldTypography className={styles.subtitle}>
        בחר באיזה ימים הנך מעוניין שהגיבוי יתבצע:
        </SubtitleBoldTypography>

      <FormControlLabel
        labelPlacement="top"
        label="הכל"
        className={styles.formControlLabel}
        control={
          <CheckBoxWithSound
            name="everything"
            checked={daysOfWeek["everything"]}
            onChange={onChange}
            value="checkedB"
            color="primary"
          />
        }
      />

      <FormControlLabel
        labelPlacement="top"
        label="יום א'"
        control={
          <CheckBoxWithSound
            name="0"
            checked={daysOfWeek["0"]}
            onChange={onChange}
            value="checkedB"
            color="primary"
          />
        }
      />

      <FormControlLabel
        labelPlacement="top"
        label="יום ב'"
        control={
          <CheckBoxWithSound
            name="1"
            checked={daysOfWeek["1"]}
            onChange={onChange}
            value="checkedB"
            color="primary"
          />
        }
      />

      <FormControlLabel
        labelPlacement="top"
        label="יום ג'"
        control={
          <CheckBoxWithSound
            name="2"
            checked={daysOfWeek["2"]}
            onChange={onChange}
            value="checkedB"
            color="primary"
          />
        }
      />

      <FormControlLabel
        labelPlacement="top"
        label="יום ד'"
        control={
          <CheckBoxWithSound
            name="3"
            checked={daysOfWeek["3"]}
            onChange={onChange}
            value="checkedB"
            color="primary"
          />
        }
      />

      <FormControlLabel
        labelPlacement="top"
        label="יום ה'"
        control={
          <CheckBoxWithSound
            name="4"
            checked={daysOfWeek["4"]}
            onChange={onChange}
            value="checkedB"
            color="primary"
          />
        }
      />

      <FormControlLabel
        labelPlacement="top"
        label="יום ו'"
        control={
          <CheckBoxWithSound
            name="5"
            checked={daysOfWeek["5"]}
            onChange={onChange}
            value="checkedB"
            color="primary"
          />
        }
      />

      <FormControlLabel
        labelPlacement="top"
        label="יום ש'"
        control={
          <CheckBoxWithSound
            name="6"
            checked={daysOfWeek["6"]}
            onChange={onChange}
            value="checkedB"
            color="primary"
          />
        }
      />

    </div>
  );
}