import React from "react";
import Box from "@material-ui/core/Box";
import SectionWithHeader from "../../../../../../components/Section/SectionWithHeader";
import SectionControlsContainer from "../../../../../../components/table/TableControls/SectionControlsContainer";
import DefaultExpnansesCodesTransferList from "./DefaultExpnansesCodesTransferList";
import { Typography } from "@material-ui/core";

const DefaultExpansesCodes = () => {
  return (
    <SectionWithHeader>
      <SectionControlsContainer edit={false} addNew={false} print={false} />

      <Box display="flex" justifyContent="center">
        <Typography variant="h5" fontWeight="600">
          רשימת קודי הברירת מחדל משמשים ליצירת דוחות ריקים
        </Typography>
      </Box>

      <Box minHeight={"600px"} padding="20px">
        <DefaultExpnansesCodesTransferList />
      </Box>
    </SectionWithHeader>
  );
};

export default DefaultExpansesCodes;
