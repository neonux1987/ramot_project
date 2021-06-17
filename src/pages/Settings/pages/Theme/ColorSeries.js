// LIBRARIES
import React, { useState } from 'react';
import ColorPreviewBox from '../../../../components/ColorPicker/ColorPreviewBox';
import { css } from 'emotion';
import WhiteButton from '../../../../components/buttons/WhiteButton';
import SimpleColorPicker from '../../../../components/ColorPicker/SimpleColorPicker';

const _wrapper = css`
  margin-bottom: 40px;
`;

const _colorSeriesWrapper = css`
display: flex;
align-items: center;
`;

const _colorPickeStyle = css`
margin-top: 20px;
`;

const _colorPreviewBox = css`
  margin-left: 10px;
`;

export const ColorSeries = ({ action, colorSet, defaultColorSet }) => {

  const keys = Object.keys(colorSet);

  const [colors, setColors] = useState(colorSet);

  const [editMode, setEditMode] = useState(false);

  const [key, setKey] = useState(null);

  const onClose = () => {
    setEditMode(false);
    setKey(null);
  }

  const onAccept = () => {
    action(colors);
    setEditMode(false);
    setKey(null);
  }

  const onClick = (key) => {
    setEditMode(true);
    setKey(key);
  }

  const onChange = event => {
    setColors({
      ...colors,
      [key]: event.hex
    });
  }

  const restoreDefault = () => {
    setColors(defaultColorSet);
    action(defaultColorSet);
  }

  return <div className={_wrapper}>

    <div className={_colorSeriesWrapper}>
      {keys.map(innerKey => {
        return <ColorPreviewBox
          color={colors[innerKey]}
          key={colors[innerKey]}
          className={_colorPreviewBox}
          onClick={() => onClick(innerKey)}
          style={{ border: colors[innerKey] === colors[key] ? "2px solid #ddd" : "none" }}
        />
      })}

      <WhiteButton onClick={restoreDefault}>שחזר לברירת מחדל</WhiteButton>
    </div>

    {editMode ? <SimpleColorPicker
      color={colors[key]}
      onChange={onChange}
      onClose={onClose}
      onAccept={onAccept}
      className={_colorPickeStyle}
    /> : null}

  </div>

}

export default ColorSeries;