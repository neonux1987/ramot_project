import React, { useEffect, useState } from 'react';
import { Input } from '@material-ui/core';
import { css } from 'emotion';
import { SketchPicker } from 'react-color';
import SquareButton from '../buttons/SquareButton';
import { Close } from '@material-ui/icons';
import ColorPreviewBox from './ColorPreviewBox';

const _wrapper = css`
  position: relative;
`;

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

const _previewWrapper = css`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ColorPicker = ({ value, action, withField = true }) => {

  const [color, setColor] = useState(value);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    setColor(value);
  }, [value]);

  const onChange = event => {
    setColor(event.hex);
  }

  const onClose = () => {
    action(color);
    setEditMode(false);
  }

  return <div className={_wrapper}>
    {editMode ?
      <div className={_colorPickerWrapper}>
        <div className={_buttonWrapper}>
          <SquareButton Icon={Close} className={_button} onClick={onClose} />
        </div>

        <SketchPicker
          name='color'
          color={color}
          onChange={onChange}
        />
      </div> : null}

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