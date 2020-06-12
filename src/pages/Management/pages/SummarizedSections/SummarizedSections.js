// LIBRARIES
import React, { Fragment } from 'react';
import { TableChart } from '@material-ui/icons';

// COMPONENTS
import TableExpandableSection from '../../../../components/Section/TableExpandableSection';

// CONTAINERS
import SummarizedSectionsTableContainer from './SummarizedSectionsTableContainer';

const TABLE_TITLE = "טבלת מעקב וניהול סעיפים מסכמים";

const SummarizedSections = () => {

  return (
    <Fragment>

      <TableExpandableSection title={TABLE_TITLE} TitleIcon={TableChart}>

        <SummarizedSectionsTableContainer />

      </TableExpandableSection> {/* end Section */}

    </Fragment>
  );

}

export default SummarizedSections;