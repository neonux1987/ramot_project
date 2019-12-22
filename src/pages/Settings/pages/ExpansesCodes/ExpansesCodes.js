// LIBRARIES
import React, { Fragment } from 'react';
import { TableChart } from '@material-ui/icons';

// COMPONENTS
import SectionHeader from '../../../../components/SectionHeader/SectionHeader';
import Section from '../../../../components/Section/Section';

// CONTAINERS
import ExpansesCodesTableContainer from './ExpansesCodesTableContainer';

const PAGE_NAME = "budgetExecutions";
const TABLE_TITLE = "טבלת מעקב קודי הנהלת חשבונות";

const ExpansesCodes = () => {

  return (
    <Fragment>

      <SectionHeader title={TABLE_TITLE} TitleIcon={TableChart} />

      <Section>

        <ExpansesCodesTableContainer />

      </Section> {/* end Section */}

    </Fragment>
  );

}

export default ExpansesCodes;