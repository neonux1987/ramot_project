// LIBRARIES
import React, { Fragment } from 'react';
import { TableChart } from '@material-ui/icons';

// COMPONENTS
import TableExpandableSection from '../../../../components/Section/TableExpandableSection';

// CONTAINERS
import ExpansesCodesTableContainer from './ExpansesCodesTableContainer';


const TABLE_TITLE = "טבלת מעקב וניהול קודי הנהלת חשבונות";

const ExpansesCodes = () => {

  return (
    <Fragment>

      <TableExpandableSection title={TABLE_TITLE} TitleIcon={TableChart}>

        <ExpansesCodesTableContainer />

      </TableExpandableSection> {/* end Section */}

    </Fragment>
  );

}

export default ExpansesCodes;