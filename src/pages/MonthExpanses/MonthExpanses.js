// LIBRARIES
import React, { useEffect } from 'react';
import { withRouter } from 'react-router';
import { ListAlt } from '@material-ui/icons';
import { useDispatch } from 'react-redux';

// COMPONENTS
import { AlignCenterMiddle } from '../../components/AlignCenterMiddle/AlignCenterMiddle';
import Spinner from '../../components/Spinner/Spinner';
import DateDetails from '../../components/DateDetails/DateDetails';
import PageHeader from '../../components/PageHeader/PageHeader';

// CONTAINERS
import MonthExpansesTableContainer from './MonthExpansesTableContainer';

// HOOKS
import useDate from '../../customHooks/useDate';

// ACTIONS
import { initRegisteredYears } from '../../redux/actions/registeredYearsActions';
import { initRegisteredMonths } from '../../redux/actions/registeredMonthsActions';
import TableSection from '../../components/Section/TableSection';

const PAGE_NAME = "monthExpanses";
const PAGE_TITLE = "הוצאות חודשיות";
const TABLE_TITLE = "טבלת מעקב הוצאות חודשיות";

const MonthExpanses = props => {

  //building name
  const { buildingName, buildingNameEng } = props.location.state;

  const dispatch = useDispatch();

  const [date] = useDate(PAGE_NAME, buildingNameEng);

  useEffect(() => {
    dispatch(initRegisteredYears(PAGE_NAME, buildingNameEng));
    dispatch(initRegisteredMonths(PAGE_NAME, buildingNameEng));
  }, [dispatch, buildingNameEng]);

  if (date === undefined)
    return <AlignCenterMiddle><Spinner loadingText={"טוען נתונים"} /></AlignCenterMiddle>;

  return (
    <div className={"page"}>

      <PageHeader building={buildingName} page={PAGE_TITLE} />

      <TableSection
        title={TABLE_TITLE}
        Icon={ListAlt}
        extraDetails={<DateDetails
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

      </TableSection>

    </div>
  );
}

export default withRouter(MonthExpanses)