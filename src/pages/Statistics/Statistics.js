// LIBRARIES
import React from 'react';
import { IoMdStats } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';

// COMPONENTS
import PageHeader from '../../components/PageHeader/PageHeader';
import Page from '../../components/Page/Page';
import SimpleTitledSection from '../../components/Section/SimpleTitledSection';

// CHARTS
import MonthsChartContainer from './charts/MonthsChartContainer';
import YearsChartContainer from './charts/YearsChartContainer';
import QuartersChartContainer from './charts/QuartersChartContainer';
import TopChartContainer from './charts/TopChartContainer';

// ACTIONS
import { updateSelectedChart } from '../../redux/actions/statisticsActions';
import ChartSelectorNav from '../../components/charts/ChartSelectorNav';
import { Box } from '@material-ui/core';
import useBuildingColor from '../../customHooks/useBuildingColor';

const PAGE_NAME = "statistics";
const PAGE_TITLE = "סטטיסטיקה";

const BY_MONTHS_TITLE = "הוצאות והכנסות לפי חודשים";
const BY_QUARTERS_TITLE = "הוצאות והכנסות לפי רבעונים";
const BY_YEARS_TITLE = "הוצאות והכנסות לפי שנים";
const TOP_EXPANSES_TITLE = "טופ הוצאות";

const Statistics = props => {
  //building name
  const { buildingName, buildingId } = props.location.state;

  const { selectedChart } = useSelector(store => store.statistics[buildingId]);

  const dispatch = useDispatch();
  const [buildingColor] = useBuildingColor(buildingId);

  const onClick = (name) => {
    dispatch(updateSelectedChart(buildingId, name));
  }

  const Chart = whichChart(selectedChart);

  const ExtraDetails = () => <Box display="flex">
    <ChartSelectorNav onClick={onClick} active={selectedChart} />
  </Box>

  return <Page>
    <PageHeader buildingName={buildingName} buildingId={buildingId} page={PAGE_TITLE} />
    <SimpleTitledSection
      bgColor={buildingColor}
      title={selectedChart}
      Icon={IoMdStats}
      extraDetails={<ExtraDetails />}
    >
      <Chart buildingId={buildingId} pageName={PAGE_NAME} />
    </SimpleTitledSection>
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