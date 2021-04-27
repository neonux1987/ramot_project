// LIBRARIES
import React from 'react';

// CONTAINERS
import ExpansesCodesTableContainer from './ExpansesCodesTableContainer';
import Page from '../../../../components/Page/Page';
import SimplePageHeader from '../../../../components/PageHeader/SimplePageHeader';

const TABLE_TITLE = "מעקב וניהול קודי הנהלת חשבונות";

const ExpansesCodes = () => {

  return (
    <Page>
      <SimplePageHeader title={TABLE_TITLE} />
      <ExpansesCodesTableContainer />
    </Page>
  );

}

export default ExpansesCodes;