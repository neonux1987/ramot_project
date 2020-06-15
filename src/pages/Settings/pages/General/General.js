import React, { Fragment } from 'react';
import SystemContainer from './System/SystemContainer';
import GoodByeWrapper from '../../../../goodbye/GoodByeWrapper';
import UserContainer from './User/UserContainer';

export const General = () => {

  return (
    <Fragment>

      <UserContainer />

      <SystemContainer />

      <GoodByeWrapper />

    </Fragment>
  );

}

export default General;