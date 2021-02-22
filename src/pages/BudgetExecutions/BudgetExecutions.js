// LIBRARIES
import React, { useEffect } from 'react';
import { withRouter } from 'react-router';
import { ListAlt } from '@material-ui/icons';
import { useDispatch } from 'react-redux';
import { IoMdStats } from 'react-icons/io';

// COMMON COMPONENTS
import { AlignCenterMiddle } from '../../components/AlignCenterMiddle/AlignCenterMiddle';
import Spinner from '../../components/Spinner/Spinner';
import DateDetails from '../../components/DateDetails/DateDetails';
import SvgIconWrapper from '../../components/SvgIconWrapper/SvgIconWrapper';

// CONTAINERS
import QuarterStatsContainer from './QuarterStatsContainer';
import BudgetExecutionsTableContainer from './BudgetExecutionsTableContainer';

// HOOKS
import useDate from '../../customHooks/useDate';

// ACTIONS
import { initRegisteredYears } from '../../redux/actions/registeredYearsActions';
import { initRegisteredQuarters } from '../../redux/actions/registeredQuartersActions';
import PageHeader from '../../components/PageHeader/PageHeader';
import Section from '../../components/Section/Section';
import StyledSection from '../../components/Section/StyledSection';

const PAGE_NAME = "budgetExecutions";
const PAGE_TITLE = "מעקב ביצוע מול תקציב";
const STATS_TITLE = "סיכום הוצאות והכנסות רבעוני";
const TABLE_TITLE = "טבלת מעקב ביצוע מול תקציב";

const BudgetExecutions = props => {

  //building name
  const { buildingName, buildingNameEng } = props.location.state;

  const dispatch = useDispatch();

  const [date] = useDate(PAGE_NAME, buildingNameEng);

  useEffect(() => {
    dispatch(initRegisteredYears(PAGE_NAME, buildingNameEng));
    dispatch(initRegisteredQuarters(PAGE_NAME, buildingNameEng));
    window.scrollTo(0, 0);
  }, [dispatch, buildingNameEng]);

  if (date === undefined)
    return <AlignCenterMiddle><Spinner loadingText={"טוען נתונים"} /></AlignCenterMiddle>;

  return <div className={"page"}>

    <PageHeader building={buildingName} page={PAGE_TITLE} />

    <Section
      title={STATS_TITLE}
      TitleIcon={<SvgIconWrapper Icon={IoMdStats} color="#ffffff" />}
      iconColor="rgb(255 0 82)"
    >
      <QuarterStatsContainer
        buildingName={buildingNameEng}
        date={date}
        pageName={PAGE_NAME}
      />
    </Section>

    <StyledSection
      title={TABLE_TITLE}
      Icon={ListAlt}
      extraDetails={() => <DateDetails
        quarter={date.quarter}
        year={date.year}
      />}
    >
      <BudgetExecutionsTableContainer
        location={props.location}
        date={date}
        pageName={PAGE_NAME}
        pageTitle={PAGE_TITLE}
      />
    </StyledSection>

  </div>


}

export default withRouter(BudgetExecutions);