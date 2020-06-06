// LIBRARIES
import React from 'react';
import { Checkbox } from '@material-ui/core';

// CSS
import { container } from './NotificationsAlerts.module.css';

// COMPONENTS
import SubtitleBoldTypography from '../../../../../../components/Typographies/SubtitleBoldTypography';

export default ({ notificationsEnabled, onNotificationsCheck }) => {
  return (
    <div className={container}>
      <Checkbox
        checked={notificationsEnabled}
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