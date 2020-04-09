// LIBRARIES
import React, { Fragment } from 'react';
import { TableChart } from '@material-ui/icons';

// COMPONENTS
import ExpandableSection from '../../../../components/Section/ExpandableSection';

// CONTAINERS
import ExpansesCodesTableContainer from './ExpansesCodesTableContainer';

const TABLE_TITLE = "טבלת מעקב וניהול קודי הנהלת חשבונות";

const ExpansesCodes = () => {

  return (
    <Fragment>

      <ExpandableSection title={TABLE_TITLE} TitleIcon={TableChart}>

        <ExpansesCodesTableContainer />

      </ExpandableSection> {/* end Section */}

    </Fragment>
  );

}

export default ExpansesCodes;