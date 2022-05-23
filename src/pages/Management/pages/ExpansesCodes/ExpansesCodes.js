import React from 'react';
import ExpansesCodesTableContainer from './ExpansesCodesTableContainer';
import Page from '../../../../components/Page/Page';
import TitledSection from '../../../../components/Section/TitledSection';
import useIcons from '../../../../customHooks/useIcons';

const TABLE_TITLE = "מעקב וניהול קודי הנהלת חשבונות";

const ExpansesCodes = () => {
  const [generateIcon] = useIcons();
  const TableIcon = generateIcon("table");
  return (
    <Page>
      <TitledSection title={TABLE_TITLE} TitleIcon={TableIcon} margin="0">
        <ExpansesCodesTableContainer />
      </TitledSection>
    </Page>
  );

}

export default ExpansesCodes;