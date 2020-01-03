// LIBRARIES
import React, { Fragment } from 'react';
import { TableChart } from '@material-ui/icons';

// COMPONENTS
import SectionHeader from '../../../../components/SectionHeader/SectionHeader';
import Section from '../../../../components/Section/Section';

// CONTAINERS
import SummarizedSectionsTableContainer from './SummarizedSectionsTableContainer';

const TABLE_TITLE = "טבלת מעקב וניהול סעיפים מסכמים";

const SummarizedSections = () => {

  return (
    <Fragment>

      <SectionHeader title={TABLE_TITLE} TitleIcon={TableChart} />

      <Section>

        <SummarizedSectionsTableContainer />

      </Section> {/* end Section */}

    </Fragment>
  );

}

export default SummarizedSections;