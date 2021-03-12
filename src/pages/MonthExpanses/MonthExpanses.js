// LIBRARIES
import React from 'react';
import { withRouter } from 'react-router';
import { ListAlt } from '@material-ui/icons';

// COMPONENTS
import { AlignCenterMiddle } from '../../components/AlignCenterMiddle/AlignCenterMiddle';
import Spinner from '../../components/Spinner/Spinner';
import PageHeader from '../../components/PageHeader/PageHeader';
import TableSection from '../../components/Section/TableSection';
import Page from '../../components/Page/Page';

// CONTAINERS
import MonthExpansesTableContainer from './MonthExpansesTableContainer';

// HOOKS
import useDate from '../../customHooks/useDate';

const PAGE_NAME = "monthExpanses";
const PAGE_TITLE = "הוצאות חודשיות";
const TABLE_TITLE = "טבלת מעקב הוצאות חודשיות";

const MonthExpanses = props => {

  //building name
  const { buildingName, buildingNameEng } = props.location.state;

  const [date] = useDate(PAGE_NAME, buildingNameEng);

  if (date === undefined)
    return <AlignCenterMiddle><Spinner loadingText={"טוען נתונים"} /></AlignCenterMiddle>;

  return (
    <Page>

      <PageHeader building={buildingName} page={PAGE_TITLE} />

      <TableSection
        title={TABLE_TITLE}
        Icon={ListAlt}
      >

        <MonthExpansesTableContainer
          location={props.location}
          date={date}
          pageName={PAGE_NAME}
          pageTitle={PAGE_TITLE}
        />

      </TableSection>

    </Page>
  );
}

export default withRouter(MonthExpanses)