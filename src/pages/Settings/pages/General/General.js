import React, { Fragment } from 'react';
import NotificationsContainer from './Notifications/NotificationsContainer';
import SystemContainer from './System/SystemContainer';
import GoodByeWrapper from '../../../../goodbye/GoodByeWrapper';
import UserContainer from './User/UserContainer';

export const General = () => {

  return (
    <Fragment>

      <UserContainer />

      <SystemContainer />

      <NotificationsContainer />

      <GoodByeWrapper />

    </Fragment>
  );

}

export default General;