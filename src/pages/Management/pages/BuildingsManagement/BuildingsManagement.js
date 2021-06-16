// LIBRARIES
import React from 'react';

// CONTAINERS
import BuildingsManagementTableContainer from './BuildingsManagementTableContainer';
import Page from '../../../../components/Page/Page';
import SimplePageHeader from '../../../../components/PageHeader/SimplePageHeader';
import Note from '../../../../components/Note/Note';

const TABLE_TITLE = "ניהול בניינים";

const BuildingsManagement = () => {

  return (
    <Page>
      <SimplePageHeader title={TABLE_TITLE} />
      <Note margin="0 20px 0 0" text="בניינים שהועברו לסטטוס מחיקה, ימחקו לאחר 30 יום לאחר אישור המשתמש" important />
      <BuildingsManagementTableContainer />
    </Page>
  );

}

export default BuildingsManagement;