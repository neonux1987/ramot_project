// LIBRARIES
import React from "react";
import SummarizedSectionsTableContainer from "./SummarizedSectionsTableContainer";
import Page from "../../../../components/Page/Page";
import TitledSection from "../../../../components/Section/TitledSection";
import TableIcon from "../../../../components/Icons/TableIcon";

const TABLE_TITLE = "מעקב וניהול סעיפים מסכמים";

const SummarizedSections = () => {
  return (
    <Page>
      <TitledSection title={TABLE_TITLE} TitleIcon={TableIcon} margin="0">
        <SummarizedSectionsTableContainer />
      </TitledSection>
    </Page>
  );
};

export default SummarizedSections;
