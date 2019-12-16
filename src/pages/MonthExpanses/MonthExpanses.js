// LIBRARIES
import React, { Fragment } from 'react';
import { withRouter } from 'react-router';

// COMMON COMPONENTS
import Header from '../../components/Header/Header';
import Section from '../../components/Section/Section';
import { AlignCenterMiddle } from '../../components/AlignCenterMiddle/AlignCenterMiddle';
import Spinner from '../../components/Spinner/Spinner';

// DATA FETHCER
import DateProvider from '../../renderProps/providers/DateProvider';

// CONTAINERS
import MonthExpansesTableContainer from './MonthExpansesTableContainer';

const PAGE_NAME = "monthExpanses";
const PAGE_TITLE = "מעקב הוצאות חודשיות";
const TABLE_TITLE = "טבלת מעקב הוצאות חודשי";

const MonthExpanses = props => {

  //building name
  const { buildingNameEng } = props.location.state;

  return (
    <Fragment>

      <Header bgColor="rgb(44, 183, 197)">
        {PAGE_TITLE}
      </Header>

      <DateProvider pageName={PAGE_NAME} buildingName={buildingNameEng}>
        {({ date, actions }) => {

          if (date === undefined || date[buildingNameEng] === undefined)
            return <AlignCenterMiddle><Spinner loadingText={"טוען נתוני עמוד..."} /></AlignCenterMiddle>;
          else {
            return (
              <Fragment>

                <Section title={TABLE_TITLE}>

                  <MonthExpansesTableContainer
                    location={props.location}
                    date={date[buildingNameEng]}
                    dateActions={actions}
                    pageName={PAGE_NAME}
                    pageTitle={PAGE_TITLE}
                  />

                </Section>

              </Fragment>
            );
          }
        }}
      </DateProvider>

    </Fragment>
  );
}

export default withRouter(MonthExpanses)