// LIBRARIES
import React from 'react';
import { IoMdStats } from 'react-icons/io';
import { Button } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';

// COMPONENTS
import PageHeader from '../../components/PageHeader/PageHeader';
import Page from '../../components/Page/Page';
import StyledSection from '../../components/Section/StyledSection';

// CHARTS
import MonthsChartContainer from './charts/MonthsChartContainer';
import YearsChartContainer from './charts/YearsChartContainer';
import QuartersChartContainer from './charts/QuartersChartContainer';
import TopChartContainer from './charts/TopChartContainer';

// ACTIONS
import { updateSelectedChart } from '../../redux/actions/statisticsActions';
import { exportChart } from '../../services/chart.svc';

const PAGE_NAME = "statistics";
const PAGE_TITLE = "סטטיסטיקה";

const BY_MONTHS_TITLE = "הוצאות והכנסות לפי חודשים";
const BY_QUARTERS_TITLE = "הוצאות והכנסות לפי רבעונים";
const BY_YEARS_TITLE = "הוצאות והכנסות לפי שנים";
const TOP_EXPANSES_TITLE = "טופ הוצאות";

const activeClass = "activeExpandItem";

const Statistics = props => {
  //building name
  const { buildingName, buildingNameEng } = props.location.state;

  const { selectedChart } = useSelector(store => store.statistics[buildingNameEng]);

  const dispatch = useDispatch();

  const onClick = (name) => {
    dispatch(updateSelectedChart(buildingNameEng, name));
  }

  const Chart = whichChart(selectedChart);

  return <Page>

    <PageHeader buildingName={buildingName} buildingNameEng={buildingNameEng} page={PAGE_TITLE} />
    <button onClick={exportChart} >test</button>
    <StyledSection
      title={selectedChart}
      Icon={IoMdStats}
      extraDetails={<SectionNav onClick={onClick} active={selectedChart} />}
    >
      <Chart buildingNameEng={buildingNameEng} pageName={PAGE_NAME} />
    </StyledSection>

  </Page>;

}

export default Statistics;

const SectionNav = ({ active, onClick }) => {

  return <div style={{ paddingLeft: "10px" }}>
    <Button onClick={() => onClick(BY_MONTHS_TITLE)} className={active === BY_MONTHS_TITLE ? activeClass : ""}>חודשים</Button>
    <Button onClick={() => onClick(BY_QUARTERS_TITLE)} className={active === BY_QUARTERS_TITLE ? activeClass : ""}>רבעונים</Button>
    <Button onClick={() => onClick(BY_YEARS_TITLE)} className={active === BY_YEARS_TITLE ? activeClass : ""}>שנים</Button>
    <Button onClick={() => onClick(TOP_EXPANSES_TITLE)} className={active === TOP_EXPANSES_TITLE ? activeClass : ""}>טופ</Button>
  </div>
}

function whichChart(name) {
  switch (name) {
    case BY_MONTHS_TITLE: return MonthsChartContainer;
    case BY_QUARTERS_TITLE: return QuartersChartContainer;
    case BY_YEARS_TITLE: return YearsChartContainer;
    case TOP_EXPANSES_TITLE: return TopChartContainer;
    default: return MonthsChartContainer;
  }
}