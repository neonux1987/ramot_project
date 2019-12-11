// LIBRARIES IMPORTS
import React, { Fragment } from 'react';
import { withRouter } from 'react-router';

// COMMON COMPONENTS IMPORTS
import Header from '../../common/Header/Header';
import Section from '../../common/Section/Section';

import withBudgetExecutionsProvider from '../../HOC/dataProviders/withBudgetExecutionsProvider';
import BudgetExecutionsTable from './BudgetExecutionsTable';
import QuarterStats from './QuarterStats';
import { AlignCenterMiddle } from '../../common/AlignCenterMiddle/AlignCenterMiddle';
import Spinner from '../../common/Spinner/Spinner';
import DateProvider from '../../renderProps/providers/DateProvider';


const PAGE_NAME = "budgetExecutions";

const BudgetExecutions = props => {

  //building name
  const { buildingNameEng } = props.location.state;

  return <Fragment>

    <Header bgColor="rgb(44, 183, 197)">
      {"מעקב ביצוע מול תקציב"}
    </Header>

    <DateProvider pageName={PAGE_NAME} buildingName={buildingNameEng}>
      {(date) => {

        const TableComponent = withBudgetExecutionsProvider(BudgetExecutionsTable, buildingNameEng, date);

        if (date === undefined || date[buildingNameEng] === undefined)
          return <AlignCenterMiddle><Spinner loadingText={"טוען הגדרות עמוד מעקב מול ביצוע..."} /></AlignCenterMiddle>;
        else {
          return (
            <Fragment>

              <Section title={"סיכום הוצאות והכנסות רבעוני"}>
                <QuarterStats
                  buildingName={buildingNameEng}
                  date={date[buildingNameEng]}
                  pageName={PAGE_NAME}
                />
              </Section>

              <Section title={"טבלת מעקב הוצאות חודשי"}>

                <TableComponent location={props.location} />}

              </Section>

            </Fragment>
          );
        }
      }}
    </DateProvider>

  </Fragment>


}

export default withRouter(BudgetExecutions);