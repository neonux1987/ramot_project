// LIBRARIES
import React, { Fragment } from 'react';
import { TableChart } from '@material-ui/icons';

// COMPONENTS
import SectionHeader from '../../../../components/SectionHeader/SectionHeader';
import Section from '../../../../components/Section/Section';

// CONTAINERS
import ExpansesCodesTableContainer from './ExpansesCodesTableContainer';

const TABLE_TITLE = "טבלת מעקב וניהול קודי הנהלת חשבונות";

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