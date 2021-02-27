// LIBRARIES
import React, { Fragment } from 'react';
import { TableChart } from '@material-ui/icons';

// COMPONENTS
import TableSection from '../../../../components/Section/TableSection';

// CONTAINERS
import ExpansesCodesTableContainer from './ExpansesCodesTableContainer';



const TABLE_TITLE = "טבלת מעקב וניהול קודי הנהלת חשבונות";

const ExpansesCodes = () => {

  return (
    <TableSection
      title={TABLE_TITLE}
      Icon={TableChart}
    >
      <ExpansesCodesTableContainer />
    </TableSection>
  );

}

export default ExpansesCodes;