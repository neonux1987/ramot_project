// LIBRARIES
import React, { useEffect } from 'react';
import Wrapper from '../../components/Wrapper/Wrapper';
import { useDispatch } from 'react-redux';
import { IoMdStats } from 'react-icons/io';

// HOOKS
import useDate from '../../customHooks/useDate';

// COMPONENTS
import { AlignCenterMiddle } from '../../components/AlignCenterMiddle/AlignCenterMiddle';
import Spinner from '../../components/Spinner/Spinner';
import StrippedExpandableSection from '../../components/Section/StrippedExpandableSection';
import SvgIconWrapper from '../../components/SvgIconWrapper/SvgIconWrapper';

// ACTIONS
import { initRegisteredYears } from '../../redux/actions/registeredYearsActions';
import { initRegisteredQuarters } from '../../redux/actions/registeredQuartersActions';
import { initRegisteredMonths } from '../../redux/actions/registeredMonthsActions';

// CONTAINERS
import YearsChartContainer from './YearsChartContainer';
import MonthsChartContainer from './MonthsChartContainer';

const PAGE_NAME = "statistics";
const TITLE = "הוצאות והכנסות לפי חודשים";

export default props => {
  //building name
  const { buildingNameEng } = props.location.state;

  const dispatch = useDispatch();

  const [date] = useDate(PAGE_NAME, buildingNameEng);

  useEffect(() => {
    dispatch(initRegisteredYears(PAGE_NAME, buildingNameEng));
  }, [dispatch, buildingNameEng]);

  if (date === undefined)
    return <AlignCenterMiddle><Spinner loadingText={"טוען נתונים"} /></AlignCenterMiddle>;

  return (
    <Wrapper className="page">

      <StrippedExpandableSection
        title={TITLE}
        TitleIcon={<SvgIconWrapper Icon={IoMdStats} color="rgb(255 0 82)" />}
        margin="0"
      >
        <MonthsChartContainer
          buildingName={buildingNameEng}
          pageName={PAGE_NAME}
          date={date}
        />
      </StrippedExpandableSection>

      {/* <YearsChartContainer buildingName={buildingNameEng} pageName={PAGE_NAME} date={date} /> */}



    </Wrapper>
  );

}