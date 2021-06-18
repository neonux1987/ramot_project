import React, { useEffect, useState } from 'react';
import { Input } from '@material-ui/core';
import { css } from 'emotion';
import SimpleColorPicker from './SimpleColorPicker';
import ColorPreviewBox from './ColorPreviewBox';

const _wrapper = css`
  position: relative;
`;

const _colorPickerWrapper = css`
  position: absolute;
  z-index: 2;
  top: 0;
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
        color={color}
        onChange={onChange}
        onClose={onClose}
        onAccept={onAccept}
        className={_colorPickerWrapper}
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