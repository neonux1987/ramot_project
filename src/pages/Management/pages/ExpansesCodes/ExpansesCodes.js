import React from "react";
import ExpansesCodesTableContainer from "./panels/ExpansesCodesTable/ExpansesCodesTableContainer";
import Page from "../../../../components/Page/Page";
import TitledSection from "../../../../components/Section/TitledSection";
import useIcons from "../../../../customHooks/useIcons";
import NavigationPanel from "./NavigationPanel";
import TabPanel from "../../../../components/TabPanel/TabPanel";
import DefaultExpansesCodes from "./panels/DefaultExpansesCodes/DefaultExpansesCodes";

const TABLE_TITLE = "מעקב וניהול קודי הנהלת חשבונות";

const ExpansesCodes = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (_, newValue) => {
    setValue(newValue);
  };

  const [generateIcon] = useIcons();
  const TableIcon = generateIcon("table");
  return (
    <Page>
      <TitledSection
        title={TABLE_TITLE}
        TitleIcon={TableIcon}
        margin="0"
        extraDetails={
          <NavigationPanel handleChange={handleChange} value={value} />
        }
      >
        <TabPanel value={value} index={0}>
          <ExpansesCodesTableContainer value={value} />
        </TabPanel>

        <TabPanel value={value} index={1}>
          <DefaultExpansesCodes />
        </TabPanel>
      </TitledSection>
    </Page>
  );
};

export default ExpansesCodes;
