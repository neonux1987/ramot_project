// LIBRARIES
import React from 'react';
import SummarizedSectionsTableContainer from './SummarizedSectionsTableContainer';
import Page from '../../../../components/Page/Page';
import SimplePageHeader from '../../../../components/PageHeader/SimplePageHeader';

const TABLE_TITLE = "מעקב וניהול סעיפים מסכמים";

const SummarizedSections = () => {

  return (
    <Page>
      <SimplePageHeader title={TABLE_TITLE} />

      <SummarizedSectionsTableContainer />
    </Page>
  );

}

export default SummarizedSections;