import React, { useEffect, useState } from 'react';
import { Input } from '@material-ui/core';
import { css } from 'emotion';
import SimpleColorPicker from './SimpleColorPicker';
import ColorPreviewBox from './ColorPreviewBox';
import { CirclePicker } from 'react-color';

const _wrapper = css`
  position: relative;
`;

const _colorPickerWrapper = css`
  position: absolute;
  z-index: 2;
  top: 0;
`;

const _pickerStyle = css`
  box-shadow: 0 4px 20px 0 rgb(0 0 0 / 14%), 0 7px 10px -5px rgb(0 0 0 / 14%);
  background: #fff;
  padding: 20px 10px 10px;
  border: 1px solid #ddd;
  margin: 0 !important;
`;

const _previewWrapper = css`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ColorPicker = ({ value, action, withField = true, editModeInput = false }) => {

  const [color, setColor] = useState(value);
  const [editMode, setEditMode] = useState(editModeInput);

  useEffect(() => {
    setColor(value);
  }, [value]);

  const onChange = event => {
    setColor(event.hex);
  }

  const onClose = () => {
    setColor(value);
    setEditMode(false);
  }

  const onAccept = () => {
    action(color);
    setEditMode(false);
  }

  return <div className={_wrapper}>
    {editMode ?
      <SimpleColorPicker
        Picker={CirclePicker}
        color={color}
        onChange={onChange}
        onClose={onClose}
        onAccept={onAccept}
        className={_colorPickerWrapper}
        pickerStyle={_pickerStyle}
      /> : null}

    <div className={_previewWrapper} onClick={() => setEditMode(true)}>
      {withField ?
        <Input
          value={color}
          className={css`color: ${color};text-align: center;`}
          inputProps={{ classes: { root: { textAlign: "center" } } }} />
        : null}

      <ColorPreviewBox color={color} />
    </div>
  </div>;

}

export default React.memo(ColorPicker);