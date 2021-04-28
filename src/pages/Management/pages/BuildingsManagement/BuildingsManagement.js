// LIBRARIES
import React from 'react';

// CONTAINERS
//import BuildingsTableContainer from './BuildingsTableContainer';
import Page from '../../../../components/Page/Page';
import SimplePageHeader from '../../../../components/PageHeader/SimplePageHeader';

const TABLE_TITLE = "ניהול בניינים";

const BuildingsManagement = () => {

  return (
    <Page>
      <SimplePageHeader title={TABLE_TITLE} />
      {/* <BuildingsTableContainer /> */}
    </Page>
  );

}

export default BuildingsManagement;