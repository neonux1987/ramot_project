import React, { Fragment } from 'react';
import { Style } from '@material-ui/icons';

import StyledExpandableSection from '../../../../components/Section/StyledExpandableSection';
import SaveButton from '../../../../components/SaveButton/SaveButton';

export const General = () => {

  return (
    <Fragment>

      <StyledExpandableSection
        title={"עיצוב"}
        TitleIcon={Style}
        iconColor={"#0365a2"}
        extraDetails={() => <SaveButton onClick={() => { }}>שמור</SaveButton>}
        padding={"30px 20px"}
      >

        <div>hello</div>

      </StyledExpandableSection >


    </Fragment>
  );

}

export default General;