import React from 'react';
import SubtitleBoldTypography from "../../../../../../components/Typographies/SubtitleBoldTypography";
import {
  container,
  subtitle,
  timePicker,
  timeInput,
  timeWrapper,
  hourWrapper,
  hoursSelector
} from './TimeSelector.module.css';
import { TimePicker } from '@material-ui/pickers';
import { FormControlLabel, FormGroup, Checkbox, MenuItem, Select } from '@material-ui/core';

const HOURS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

export default (props) => {

  const {
    time = new Date().toString(),
    every_x_hours,
    byHour,
    byTime,
    onTimeChange,
    onCheckBoxChange,
    onHourChange
  } = props;

  const renderHourItems = HOURS.map((value, index) => {
    return <MenuItem value={value} key={index}>{value}</MenuItem>
  });

  return (
    <div className={container}>

      <div>
        <FormGroup row>

          <FormControlLabel
            control={
              <Checkbox
                checked={byTime}
                onChange={onCheckBoxChange}
                name="byTime"
                color="primary"
              />
            }
            label="לפי שעה"
          />
        </FormGroup>

        <div className={timeWrapper}>

          <SubtitleBoldTypography className={subtitle}>
            פעם ביום לפי שעה מסויימת:
          </SubtitleBoldTypography>

          <TimePicker
            ampm={false}
            className={timePicker}
            inputProps={{ className: timeInput }}
            value={time}
            onChange={onTimeChange}
            disabled={!byTime}
          />
        </div>
      </div>

      <div>
        <FormGroup row>
          <FormControlLabel
            control={
              <Checkbox
                checked={byHour}
                onChange={onCheckBoxChange}
                name="byHour"
                color="primary"
              />
            }
            label="כל מספר שעות"
          />

        </FormGroup>

        <div className={hourWrapper}>
          <SubtitleBoldTypography>
            בחר כל כמה שעות לבצע גיבוי:
          </SubtitleBoldTypography>

          <Select
            className={hoursSelector}
            value={every_x_hours}
            onChange={onHourChange}
            disabled={!byHour}
          >
            {renderHourItems}
          </Select>
        </div>
      </div>

    </div>
  );
}

