// LIBRARIES
import React, { Fragment } from 'react';
import { TableChart } from '@material-ui/icons';

// COMPONENTS
import TableSection from '../../../../components/Section/TableSection';

// CONTAINERS
import SummarizedSectionsTableContainer from './SummarizedSectionsTableContainer';

const TABLE_TITLE = "טבלת מעקב וניהול סעיפים מסכמים";

const SummarizedSections = () => {

  return (
    <Fragment>

      <TableSection title={TABLE_TITLE} Icon={TableChart}>

        <SummarizedSectionsTableContainer />

      </TableSection> {/* end Section */}

    </Fragment>
  );

}

export default SummarizedSections;