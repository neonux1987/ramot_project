// LIBRARIES
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { IoMdStats } from 'react-icons/io';
import { Button } from '@material-ui/core';

// HOOKS
import useDate from '../../customHooks/useDate';

// COMPONENTS
import PageHeader from '../../components/PageHeader/PageHeader';
import Page from '../../components/Page/Page';

// ACTIONS
import { initRegisteredYears } from '../../redux/actions/registeredYearsActions';

// CONTAINERS
import MonthsChartContainer from './charts/MonthsChartContainer';
import YearsChartContainer from './charts/YearsChartContainer';
import QuartersChartContainer from './charts/QuartersChartContainer';
import StyledSection from '../../components/Section/StyledSection';

const PAGE_NAME = "statistics";
const PAGE_TITLE = "סטטיסטיקה";

const Statistics = props => {
  //building name
  const { buildingName, buildingNameEng } = props.location.state;

  const dispatch = useDispatch();

  const [chartName, setChartName] = useState("חודשים");

  useEffect(() => {
    dispatch(initRegisteredYears(PAGE_NAME, buildingNameEng));
  }, [dispatch, buildingNameEng]);

  const onClick = (name) => {
    setChartName(name);
  }

  const Chart = whichChart(chartName);

  return <Page>

    <PageHeader building={buildingName} page={PAGE_TITLE} />

    <StyledSection
      title={`הוצאות והכנסות לפי ${chartName}`}
      Icon={IoMdStats}
      extraDetails={<SectionNav onClick={onClick} active={chartName} />}
    >
      <Chart buildingName={buildingNameEng} pageName={PAGE_NAME} />
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