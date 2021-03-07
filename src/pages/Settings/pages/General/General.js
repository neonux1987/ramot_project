import React from 'react';
import SystemContainer from './System/SystemContainer';
import GoodByeWrapper from '../../../../goodbye/GoodByeWrapper';
import UserContainer from './User/UserContainer';
import Page from '../../../../components/Page/Page';

export const General = () => {

  return (
    <Page>

      <UserContainer />

      <SystemContainer />

      <GoodByeWrapper />

    </Page>
  );

}

export default General;