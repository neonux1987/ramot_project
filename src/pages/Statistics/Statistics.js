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
import ChartSelectorNav from '../../components/charts/ChartSelectorNav';

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
    <StyledSection
      title={selectedChart}
      Icon={IoMdStats}
      extraDetails={<ChartSelectorNav onClick={onClick} active={selectedChart} />}
    >
      <Chart buildingNameEng={buildingNameEng} pageName={PAGE_NAME} />
    </StyledSection>
  </Page>;

}

export default Statistics;

function whichChart(name) {
  switch (name) {
    case BY_MONTHS_TITLE: return MonthsChartContainer;
    case BY_QUARTERS_TITLE: return QuartersChartContainer;
    case BY_YEARS_TITLE: return YearsChartContainer;
    case TOP_EXPANSES_TITLE: return TopChartContainer;
    default: return MonthsChartContainer;
  }
}