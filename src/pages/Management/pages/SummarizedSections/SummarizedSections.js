// LIBRARIES
import React, { Fragment } from 'react';
import { TableChart } from '@material-ui/icons';

// COMPONENTS
import StyledExpandableSection from '../../../../components/Section/StyledExpandableSection';

// CONTAINERS
import SummarizedSectionsTableContainer from './SummarizedSectionsTableContainer';

const TABLE_TITLE = "טבלת מעקב וניהול סעיפים מסכמים";

const SummarizedSections = () => {

  return (
    <Fragment>

      <StyledExpandableSection title={TABLE_TITLE} TitleIcon={TableChart}>

        <SummarizedSectionsTableContainer />

      </StyledExpandableSection> {/* end Section */}

    </Fragment>
  );

}

export default SummarizedSections;