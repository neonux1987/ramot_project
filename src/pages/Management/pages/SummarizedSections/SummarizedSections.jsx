// LIBRARIES
import React from 'react';
import SummarizedSectionsTableContainer from './SummarizedSectionsTableContainer';
import Page from '../../../../components/Page/Page';
import TitledSection from '../../../../components/Section/TitledSection';
import useIcons from '../../../../customHooks/useIcons';

const TABLE_TITLE = "מעקב וניהול סעיפים מסכמים";

const SummarizedSections = () => {
  const [generateIcon] = useIcons();
  const TableIcon = generateIcon("table");
  return (
    <Page>
      <TitledSection title={TABLE_TITLE} TitleIcon={TableIcon} margin="0">
        <SummarizedSectionsTableContainer />
      </TitledSection>
    </Page>
  );

}

export default SummarizedSections;