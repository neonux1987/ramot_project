import React, { Fragment } from 'react';
import NotificationsContainer from './Notifications/NotificationsContainer';
import SystemContainer from './System/SystemContainer';

export const General = () => {

  return (
    <Fragment>

      <SystemContainer />

      <NotificationsContainer />

    </Fragment>
  );

}

export default General;