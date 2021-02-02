// LIBRARIES
import React, { useEffect } from 'react';
import { withRouter } from 'react-router';
import { ListAlt } from '@material-ui/icons';
import { useDispatch } from 'react-redux';

// COMPONENTS
import { AlignCenterMiddle } from '../../components/AlignCenterMiddle/AlignCenterMiddle';
import Spinner from '../../components/Spinner/Spinner';
import DateDetails from '../../components/DateDetails/DateDetails';

// CONTAINERS
import MonthExpansesTableContainer from './MonthExpansesTableContainer';

// HOOKS
import useDate from '../../customHooks/useDate';

// ACTIONS
import { initRegisteredYears } from '../../redux/actions/registeredYearsActions';
import { initRegisteredMonths } from '../../redux/actions/registeredMonthsActions';
import TableExpandableSection from '../../components/Section/TableExpandableSection';
import SvgIconWrapper from '../../components/SvgIconWrapper/SvgIconWrapper';

const PAGE_NAME = "monthExpanses";
const PAGE_TITLE = "מעקב הוצאות חודשיות";
const TABLE_TITLE = "טבלת מעקב הוצאות חודשיות";

const MonthExpanses = props => {

  //building name
  const { buildingNameEng } = props.location.state;

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
      <TableExpandableSection
        padding={"10px 15px 15px"}
        margin="20px 20px 40px"
        title={TABLE_TITLE}
        TitleIcon={<SvgIconWrapper Icon={ListAlt} color="rgb(25,121,204)" />}
        iconColor="rgb(36 110 173)"
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

      </TableExpandableSection>

    </div>
  );
}

export default withRouter(MonthExpanses)