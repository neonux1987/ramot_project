// LIBRARIES
import React from 'react';
import ColorPreviewBox from '../../../../components/ColorPicker/ColorPreviewBox';
import { css } from 'emotion';
import { SketchPicker } from 'react-color';
import SimpleColorPicker from '../../../../components/ColorPicker/SimpleColorPicker';

const _wrapper = css`
  margin-bottom: 40px;
`;

const _colorSeriesWrapper = css`
display: flex;
align-items: center;
`;

const _colorPreviewBox = css`
  margin-left: 10px;
`;

export const ColorSeries = ({ setDirty, colorSet }) => {

  const keys = Object.keys(colorSet);

  return <div className={_wrapper}>

    <div className={_colorSeriesWrapper}>
      {keys.map(key => {
        return <ColorPreviewBox color={colorSet[key]} key={colorSet[key]} className={_colorPreviewBox} />
      })}
    </div>

    <SimpleColorPicker
      color={"#555"}
      onChange={() => { }}
      onClose={() => { }}
    />
  </div>

}

export default ColorSeries;