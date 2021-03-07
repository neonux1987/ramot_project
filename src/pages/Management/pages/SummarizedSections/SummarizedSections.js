// LIBRARIES
import React from 'react';
import { TableChart } from '@material-ui/icons';

// COMPONENTS
import TableSection from '../../../../components/Section/TableSection';

// CONTAINERS
import SummarizedSectionsTableContainer from './SummarizedSectionsTableContainer';
import Page from '../../../../components/Page/Page';

const TABLE_TITLE = "טבלת מעקב וניהול סעיפים מסכמים";

const SummarizedSections = () => {

  return (
    <Page>

      <TableSection title={TABLE_TITLE} Icon={TableChart}>

        <SummarizedSectionsTableContainer />

      </TableSection> {/* end Section */}

    </Page>
  );

}

export default SummarizedSections;