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

      <TableExpandableSection margin="20px 20px 40px" title={TABLE_TITLE} TitleIcon={<TableChart />} iconColor="rgb(25, 121, 204)">

        <SummarizedSectionsTableContainer />

      </TableExpandableSection> {/* end Section */}

    </Fragment>
  );

}

export default SummarizedSections;