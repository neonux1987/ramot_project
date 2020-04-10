// LIBRARIES
import React, { Fragment } from 'react';
import { TableChart } from '@material-ui/icons';

// COMPONENTS
import StyledExpandableSection from '../../../../components/Section/StyledExpandableSection';

// CONTAINERS
import ExpansesCodesTableContainer from './ExpansesCodesTableContainer';


const TABLE_TITLE = "טבלת מעקב וניהול קודי הנהלת חשבונות";

const ExpansesCodes = () => {

  return (
    <Fragment>

      <StyledExpandableSection title={TABLE_TITLE} TitleIcon={TableChart}>

        <ExpansesCodesTableContainer />

      </StyledExpandableSection> {/* end Section */}

    </Fragment>
  );

}

export default ExpansesCodes;