// LIBRARIES
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { IoMdStats } from 'react-icons/io';
import { Button } from '@material-ui/core';

// HOOKS
import useDate from '../../customHooks/useDate';

// COMPONENTS
import { AlignCenterMiddle } from '../../components/AlignCenterMiddle/AlignCenterMiddle';
import Spinner from '../../components/Spinner/Spinner';
import PageHeader from '../../components/PageHeader/PageHeader';
import TableSection from '../../components/Section/TableSection';
import Page from '../../components/Page/Page';

// ACTIONS
import { initRegisteredYears } from '../../redux/actions/registeredYearsActions';

// CONTAINERS
import MonthsChartContainer from './charts/MonthsChartContainer';
import YearsChartContainer from './charts/YearsChartContainer';
import QuartersChartContainer from './charts/QuartersChartContainer';

const PAGE_NAME = "statistics";
const PAGE_TITLE = "סטטיסטיקה";
const TITLE = "הוצאות והכנסות לפי חודשים";

const Statistics = props => {
  //building name
  const { buildingName, buildingNameEng } = props.location.state;

  const dispatch = useDispatch();

  const [chartName, setChartName] = useState("months");

  const [date] = useDate(PAGE_NAME, buildingNameEng);

  useEffect(() => {
    dispatch(initRegisteredYears(PAGE_NAME, buildingNameEng));
  }, [dispatch, buildingNameEng]);

  const onClick = (name) => {
    setChartName(name);
  }

  if (date === undefined)
    return <AlignCenterMiddle><Spinner loadingText={"טוען נתונים"} /></AlignCenterMiddle>;

  const Chart = whichChart(chartName);

  return (
    <Page>

      <PageHeader building={buildingName} page={PAGE_TITLE} />

      <TableSection
        title={TITLE}
        Icon={IoMdStats}
        extraDetails={<TableNav onClick={onClick} active={chartName} />}
      >
        <Chart
          buildingName={buildingNameEng}
          pageName={PAGE_NAME}
          date={date}
        />
      </TableSection>

      {/* <YearsChartContainer buildingName={buildingNameEng} pageName={PAGE_NAME} date={date} /> */}

    </Page>
  );

}

export default Statistics;

const TableNav = ({ active, onClick }) => {

  return <div>
    <Button onClick={() => onClick("months")} className={active === "months" ? "activeExpandItem" : ""}>חודשים</Button>
    <Button onClick={() => onClick("quarters")} className={active === "quarters" ? "activeExpandItem" : ""}>רבעונים</Button>
    <Button onClick={() => onClick("years")} className={active === "years" ? "activeExpandItem" : ""}>שנים</Button>
  </div>
}

function whichChart(name) {
  switch (name) {
    case "months": return MonthsChartContainer;
    case "quarters": return QuartersChartContainer;
    case "years": return YearsChartContainer;
    default: return MonthsChartContainer;
  }
}