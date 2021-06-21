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
    />
  </div>;

}

export default SimpleColorPicker;