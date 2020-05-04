import React from 'react';
import { FormControlLabel, Checkbox } from "@material-ui/core";
import SubtitleBoldTypography from "../../../../../../components/Typographies/SubtitleBoldTypography";
import styles from './DaysOfWeekSelector.module.css';

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
          <Checkbox
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
          <Checkbox
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
          <Checkbox
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
          <Checkbox
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
          <Checkbox
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
          <Checkbox
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
          <Checkbox
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
          <Checkbox
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