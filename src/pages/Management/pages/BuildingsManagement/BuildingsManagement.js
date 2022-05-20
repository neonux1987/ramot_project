// LIBRARIES
import React from 'react';

// CONTAINERS
import BuildingsManagementTableContainer from './BuildingsManagementTableContainer';
import Page from '../../../../components/Page/Page';
import SimplePageHeader from '../../../../components/PageHeader/SimplePageHeader';
import Note from '../../../../components/Note/Note';
import useIconWrapper from '../../../../customHooks/useIconWrapper';

const TABLE_TITLE = "ניהול בניינים";

const BuildingsManagement = () => {
  const [getIcon] = useIconWrapper();

  const Icon = getIcon({ iconName: "bi:table", width: "28px", height: "28px" });
  return (
    <Page>
      <SimplePageHeader title={TABLE_TITLE} icon={<Icon />} />
      <Note margin="0 0 10px 0" text="בניינים שהועברו לסטטוס מחיקה, ימחקו לאחר 30 יום לאחר אישור המשתמש" important />
      <BuildingsManagementTableContainer />
    </Page>
  );

}

export default BuildingsManagement;