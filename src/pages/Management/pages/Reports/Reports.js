import React, { useEffect } from 'react';
import ExcelReportsGeneratorContainer from './ExcelReportsGenerator/ExcelReportsGeneratorContainer';
import Page from '../../../../components/Page/Page';
import EmptyReportsGeneratorContainer from './EmptyReportsGenerator/EmptyReportsGeneratorContainer';
import { fetchBuildings } from '../../../../redux/actions/reportsActions';
import { useDispatch, useSelector } from 'react-redux';

const Reports = () => {
  const dispatch = useDispatch();

  const { excelReports, isFetching } = useSelector(store => store.reports);

  useEffect(() => {
    dispatch(fetchBuildings());
  }, [dispatch]);

  return (
    <Page>
      <EmptyReportsGeneratorContainer />
      <ExcelReportsGeneratorContainer excelReports={excelReports} isFetching={isFetching} />
    </Page>
  );

}

export default Reports;