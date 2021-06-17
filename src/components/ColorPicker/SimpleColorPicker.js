import React from 'react';
import { css } from 'emotion';
import { SketchPicker } from 'react-color';
import SquareButton from '../buttons/SquareButton';
import { Close } from '@material-ui/icons';

const _colorPickerWrapper = css`
  position: absolute;
  z-index: 2;
  top: 0;
`;

const _buttonWrapper = css`
  display: flex;
`;

const _button = css`
  background: #f5f5f5 !important;
  border: 1px solid #dddddd;
`;

const SimpleColorPicker = ({ color, onChange, onClose }) => {

  return <div className={_colorPickerWrapper}>
    <div className={_buttonWrapper}>
      <SquareButton Icon={Close} className={_button} onClick={onClose} />
    </div>

    <SketchPicker
      color={color}
      onChange={onChange}
    />
  </div>;

}

export default SimpleColorPicker;