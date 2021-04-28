// LIBRARIES
import React from 'react';

// CONTAINERS
import BuildingsManagementTableContainer from './BuildingsManagementTableContainer';
import Page from '../../../../components/Page/Page';
import SimplePageHeader from '../../../../components/PageHeader/SimplePageHeader';

const TABLE_TITLE = "ניהול בניינים";

const BuildingsManagement = () => {

  return (
    <Page>
      <SimplePageHeader title={TABLE_TITLE} />
      <BuildingsManagementTableContainer />
    </Page>
  );

}

export default BuildingsManagement;