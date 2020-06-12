import React, { Fragment } from 'react';
import NotificationsContainer from './Notifications/NotificationsContainer';
import SystemContainer from './System/SystemContainer';
import GoodByeWrapper from '../../../../goodbye/GoodByeWrapper';

export const General = () => {

  return (
    <Fragment>

      <SystemContainer />

      <NotificationsContainer />

      <GoodByeWrapper />

    </Fragment>
  );

}

export default General;