import React from 'react';
import SubtitleBoldTypography from "../../../../../../components/Typographies/SubtitleBoldTypography";
import {
  container,
  subtitle,
  byTimeWrapper,
  timePicker,
  timeInput,
  byHourWrapper,
  hoursSelector,
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

      <div className={byTimeWrapper}>

        <Checkbox
          checked={byTime}
          onChange={onCheckBoxChange}
          name="byTime"
          color="primary"
        />

        <SubtitleBoldTypography className={subtitle}>
          לפי שעה מסויימת:
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

      <div className={byHourWrapper}>

        <Checkbox
          checked={byHour}
          onChange={onCheckBoxChange}
          name="byHour"
          color="primary"
        />

        <SubtitleBoldTypography>
          לפי כל כמה שעות:
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
  );
}

