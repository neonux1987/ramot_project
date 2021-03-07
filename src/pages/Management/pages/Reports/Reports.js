import React from 'react';
import ExcelReportsGeneratorContainer from './ExcelReportsGenerator/ExcelReportsGeneratorContainer';
import Page from '../../../../components/Page/Page';
import EmptyReportsGeneratorContainer from './EmptyReportsGenerator/EmptyReportsGeneratorContainer';

const Reports = () => {
  return (
    <Page>
      <EmptyReportsGeneratorContainer />
      <ExcelReportsGeneratorContainer />
    </Page>
  );

}

export default Reports;