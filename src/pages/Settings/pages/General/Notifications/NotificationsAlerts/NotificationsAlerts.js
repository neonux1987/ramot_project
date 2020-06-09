// LIBRARIES
import React from 'react';

// CSS
import { container } from './NotificationsAlerts.module.css';

// COMPONENTS
import SubtitleBoldTypography from '../../../../../../components/Typographies/SubtitleBoldTypography';

// COMPONENTS WITH SOUND
import CheckBoxWithSound from '../../../../../../componentsWithSound/CheckBoxWithSound/CheckBoxWithSound';

export default ({ enabled, onNotificationsCheck }) => {
  return (
    <div className={container}>
      <CheckBoxWithSound
        checked={enabled}
        onChange={onNotificationsCheck}
        name="notificationsCheck"
        color="primary"
      />

      <SubtitleBoldTypography>
        הפעל התראות קופצות
          </SubtitleBoldTypography>
    </div>
  );
}