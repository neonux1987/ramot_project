import React from 'react';
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