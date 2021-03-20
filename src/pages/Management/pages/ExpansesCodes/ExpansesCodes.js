// LIBRARIES
import React from 'react';
import { TableChart } from '@material-ui/icons';

// COMPONENTS
import TableSection from '../../../../components/Section/TableSection';

// CONTAINERS
import ExpansesCodesTableContainer from './ExpansesCodesTableContainer';
import Page from '../../../../components/Page/Page';



const TABLE_TITLE = "טבלת מעקב וניהול קודי הנהלת חשבונות";

const ExpansesCodes = () => {

  return (
    <Page>
      <TableSection
        title={TABLE_TITLE}
        Icon={TableChart}
      >
        <ExpansesCodesTableContainer />
      </TableSection>
    </Page>
  );

}

export default ExpansesCodes;