// LIBRARIES
import React from 'react';
import { Checkbox } from '@material-ui/core';

// CSS
import { container } from './Sound.module.css';

// COMPONENTS
import SubtitleBoldTypography from '../../../../../../components/Typographies/SubtitleBoldTypography';

export default ({ soundEnabled, onSoundCheck }) => {
  return (
    <div className={container}>
      <Checkbox
        checked={soundEnabled}
        onChange={onSoundCheck}
        name="soundCheck"
        color="primary"
      />

      <SubtitleBoldTypography>
        הפעל צליל התראות
          </SubtitleBoldTypography>
    </div>
  );
}