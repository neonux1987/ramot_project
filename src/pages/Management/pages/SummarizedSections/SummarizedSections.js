// LIBRARIES
import React, { Fragment } from 'react';
import { TableChart } from '@material-ui/icons';

// COMPONENTS
import ExpandableSection from '../../../../components/Section/ExpandableSection';

// CONTAINERS
import SummarizedSectionsTableContainer from './SummarizedSectionsTableContainer';

const TABLE_TITLE = "טבלת מעקב וניהול סעיפים מסכמים";

const SummarizedSections = () => {

  return (
    <Fragment>

      <ExpandableSection title={TABLE_TITLE} TitleIcon={TableChart}>

        <SummarizedSectionsTableContainer />

      </ExpandableSection> {/* end Section */}

    </Fragment>
  );

}

export default SummarizedSections;