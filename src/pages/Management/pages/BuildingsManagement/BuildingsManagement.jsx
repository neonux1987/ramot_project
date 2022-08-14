import React from "react";
import BuildingsManagementTableContainer from "./BuildingsManagementTableContainer";
import Page from "../../../../components/Page/Page";
import Note from "../../../../components/Note/Note";
import TitledSection from "../../../../components/Section/TitledSection";
import TableIcon from "../../../../components/Icons/TableIcon";

const TABLE_TITLE = "ניהול בניינים";

const BuildingsManagement = () => {
  return (
    <Page>
      <TitledSection title={TABLE_TITLE} TitleIcon={TableIcon} margin="0">
        <Note
          margin="0"
          text="בניינים שהועברו לסטטוס מחיקה, ימחקו לאחר 30 יום לאחר אישור המשתמש"
          important
        />
        <BuildingsManagementTableContainer />
      </TitledSection>
    </Page>
  );
};

export default BuildingsManagement;
