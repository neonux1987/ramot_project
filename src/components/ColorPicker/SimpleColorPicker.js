import React from 'react';
import { css } from 'emotion';
import { SketchPicker } from 'react-color';
import SquareButton from '../buttons/SquareButton';
import { Close, Check } from '@material-ui/icons';

const _buttonWrapper = css`
  display: flex;
`;

const _button = css`
  background: #f5f5f5 !important;
  border: 1px solid #dddddd;
`;

const presetColors = ["#f44336", "#e91e63", "#9c27b0", "#673ab7", "#3f51b5", "#2196f3", "#03a9f4", "#00bcd4", "#009688", "#4caf50", "#8bc34a", "#cddc39", "#ffeb3b", "#ffc107", "#ff9800", "#ff5722", "#795548", "#607d8b"];

const SimpleColorPicker = ({ color, onChange, onClose, onAccept, className, pickerStyle, Picker = SketchPicker }) => {

  return <div className={className}>
    <div className={_buttonWrapper}>
      <SquareButton Icon={Close} className={_button} iconColor="red" onClick={onClose} />
      <SquareButton Icon={Check} className={_button} iconColor="green" onClick={onAccept} />

    </div>

    <Picker
      className={pickerStyle}
      color={color}
      onChange={onChange}
      presetColors={presetColors}
    />
  </div>;

}

export default SimpleColorPicker;