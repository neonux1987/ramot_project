// LIBRARIES
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { IoMdStats } from 'react-icons/io';

// HOOKS
import useDate from '../../customHooks/useDate';

// COMPONENTS
import { AlignCenterMiddle } from '../../components/AlignCenterMiddle/AlignCenterMiddle';
import Spinner from '../../components/Spinner/Spinner';
import PageHeader from '../../components/PageHeader/PageHeader';
import TableSection from '../../components/Section/TableSection';

// ACTIONS
import { initRegisteredYears } from '../../redux/actions/registeredYearsActions';

// CONTAINERS
import MonthsChartContainer from './MonthsChartContainer';

const PAGE_NAME = "statistics";
const PAGE_TITLE = "סטטיסטיקה";
const TITLE = "הוצאות והכנסות לפי חודשים";

export default props => {
  //building name
  const { buildingName, buildingNameEng } = props.location.state;

  const dispatch = useDispatch();

  const [date] = useDate(PAGE_NAME, buildingNameEng);

  useEffect(() => {
    dispatch(initRegisteredYears(PAGE_NAME, buildingNameEng));
  }, [dispatch, buildingNameEng]);

  if (date === undefined)
    return <AlignCenterMiddle><Spinner loadingText={"טוען נתונים"} /></AlignCenterMiddle>;

  return (
    <div className="page">

      <PageHeader building={buildingName} page={PAGE_TITLE} />

      <TableSection
        title={TITLE}
        Icon={IoMdStats}
      >
        <MonthsChartContainer
          buildingName={buildingNameEng}
          pageName={PAGE_NAME}
          date={date}
        />
      </TableSection>

      {/* <YearsChartContainer buildingName={buildingNameEng} pageName={PAGE_NAME} date={date} /> */}

    </div>
  );

}