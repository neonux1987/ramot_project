// LIBRARIES
import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router';
import { TableChart } from '@material-ui/icons';
import { useDispatch } from 'react-redux';

// COMPONENTS
import { AlignCenterMiddle } from '../../components/AlignCenterMiddle/AlignCenterMiddle';
import Spinner from '../../components/Spinner/Spinner';
import DateDetails from '../../components/DateDetails/DateDetails';
import StyledExpandableSection from '../../components/Section/StyledExpandableSection';

// CONTAINERS
import MonthExpansesTableContainer from './MonthExpansesTableContainer';

// HOOKS
import useDate from '../../customHooks/useDate';

// UTILS
import Helper from '../../helpers/Helper';

// ACTIONS
import { fetchRegisteredYears } from '../../redux/actions/registeredYearsActions';
import { fetchRegisteredMonths } from '../../redux/actions/registeredMonthsActions';
import { updateDate, dateCleanup, initDateState } from '../../redux/actions/dateActions';

const PAGE_NAME = "monthExpanses";
const PAGE_TITLE = "מעקב הוצאות חודשיות";
const TABLE_TITLE = "טבלת מעקב הוצאות חודשי";

const MonthExpanses = props => {

  //building name
  const { buildingNameEng } = props.location.state;

  const [date] = useDate(PAGE_NAME, buildingNameEng);

  if (date === undefined)
    return <AlignCenterMiddle style={{ paddingTop: "200px" }}><Spinner loadingText={"טוען נתוני עמוד..."} /></AlignCenterMiddle>;

  return (
    <div className={"page"}>
      <StyledExpandableSection
        title={TABLE_TITLE}
        TitleIcon={TableChart}
        extraDetails={() => <DateDetails
          month={date.monthHeb}
          quarter={date.quarter}
          year={date.year}
        />}
      >

        <MonthExpansesTableContainer
          location={props.location}
          date={date}
          pageName={PAGE_NAME}
          pageTitle={PAGE_TITLE}
        />

      </StyledExpandableSection>

    </div>
  );
}

export default withRouter(MonthExpanses)