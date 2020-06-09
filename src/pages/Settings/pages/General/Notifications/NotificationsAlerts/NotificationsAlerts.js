// LIBRARIES
import React from 'react';

// CSS
import { container } from './NotificationsAlerts.module.css';

// COMPONENTS
import SubtitleBoldTypography from '../../../../../../components/Typographies/SubtitleBoldTypography';

// COMPONENTS WITH SOUND
import SwitchWithSound from '../../../../../../componentsWithSound/SwitchWithSound/SwitchWithSound';

export default ({ enabled, onNotificationsCheck }) => {
  return (
    <div className={container}>
      <SwitchWithSound
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