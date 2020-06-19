import React, { useEffect, useMemo, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchYearStatsByYearRange } from '../../redux/actions/yearlyStatsActions';
import { Line } from 'react-chartjs-2';
import Wrapper from '../../components/Wrapper/Wrapper';
import YearsChartContainer from './YearsChartContainer';

const PAGE_NAME = "statistics";

export default props => {
  //building name
  const { buildingNameEng } = props.location.state;

  return (
    <Wrapper className="page">

      <YearsChartContainer buildingName={buildingNameEng} pageName={PAGE_NAME} />

    </Wrapper>
  );

}