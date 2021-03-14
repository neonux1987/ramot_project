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

// ACTIONS
import { updateSelectedChart } from '../../redux/actions/statisticsActions';

// HOOKS
import useDate from '../../customHooks/useDate';

const PAGE_NAME = "statistics";
const PAGE_TITLE = "סטטיסטיקה";

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

    <PageHeader building={buildingName} page={PAGE_TITLE} />

    <StyledSection
      title={`הוצאות והכנסות לפי ${selectedChart}`}
      Icon={IoMdStats}
      extraDetails={<SectionNav onClick={onClick} active={selectedChart} />}
    >
      <Chart buildingNameEng={buildingNameEng} pageName={PAGE_NAME} />
    </StyledSection>

  </Page>;

}

export default Statistics;

const SectionNav = ({ active, onClick }) => {

  return <div>
    <Button onClick={() => onClick("חודשים")} className={active === "חודשים" ? "activeExpandItem" : ""}>חודשים</Button>
    <Button onClick={() => onClick("רבעונים")} className={active === "רבעונים" ? "activeExpandItem" : ""}>רבעונים</Button>
    <Button onClick={() => onClick("שנים")} className={active === "שנים" ? "activeExpandItem" : ""}>שנים</Button>
  </div>
}

function whichChart(name) {
  switch (name) {
    case "חודשים": return MonthsChartContainer;
    case "רבעונים": return QuartersChartContainer;
    case "שנים": return YearsChartContainer;
    default: return MonthsChartContainer;
  }
}