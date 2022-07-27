import React from "react";
import Box from "@material-ui/core/Box";
import SectionWithHeader from "../../../../../../components/Section/SectionWithHeader";
import SectionControlsContainer from "../../../../../../components/table/TableControls/SectionControlsContainer";
import DefaultExpnansesCodesTransferList from "./DefaultExpnansesCodesTransferList";

const DefaultExpansesCodes = () => {
  return (
    <SectionWithHeader>
      <SectionControlsContainer edit={false} addNew={false} print={false} />

      <Box minHeight={"600px"} padding="20px">
        <DefaultExpnansesCodesTransferList />
      </Box>
    </SectionWithHeader>
  );
};

export default DefaultExpansesCodes;
