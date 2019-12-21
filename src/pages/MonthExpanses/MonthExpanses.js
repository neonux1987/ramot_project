// LIBRARIES
import React, { Fragment } from 'react';
import { withRouter } from 'react-router';
import { TableChart } from '@material-ui/icons';

// COMMON COMPONENTS
import Header from '../../components/Header/Header';
import Section from '../../components/Section/Section';
import { AlignCenterMiddle } from '../../components/AlignCenterMiddle/AlignCenterMiddle';
import Spinner from '../../components/Spinner/Spinner';
import SectionHeader from '../../components/SectionHeader/SectionHeader';

// DATA FETHCER
import DateProvider from '../../renderProps/providers/DateProvider';

// CONTAINERS
import MonthExpansesTableContainer from './MonthExpansesTableContainer';

// HOC
import withPageLogic from '../../HOC/withPageLogic';

const PAGE_NAME = "monthExpanses";
const PAGE_TITLE = "מעקב הוצאות חודשיות";
const TABLE_TITLE = "טבלת מעקב הוצאות חודשי";

const MonthExpanses = props => {

  //building name
  const { buildingNameEng } = props.location.state;

  return (
    <Fragment>

      <Header bgColor="rgb(129, 86, 234)">
        {PAGE_TITLE}
      </Header>

      <DateProvider pageName={PAGE_NAME} buildingName={buildingNameEng}>
        {({ date, actions }) => {

          if (date === undefined || date[buildingNameEng] === undefined)
            return <AlignCenterMiddle><Spinner loadingText={"טוען נתוני עמוד..."} /></AlignCenterMiddle>;
          else {
            const onlyDate = date[buildingNameEng];

            return (
              <Fragment>

                <SectionHeader
                  title={TABLE_TITLE}
                  TitleIcon={TableChart}
                  extraDetails={props.dateDetails(onlyDate)}
                />

                <Section>

                  <MonthExpansesTableContainer
                    location={props.location}
                    date={onlyDate}
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

export default withRouter(
  withPageLogic(MonthExpanses)
)