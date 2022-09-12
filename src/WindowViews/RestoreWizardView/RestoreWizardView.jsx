import { createTheme, MuiThemeProvider } from "@material-ui/core";
import { heIL } from "@material-ui/core/locale";
import React from "react";
import ModalRoot from "../../components/modals/ModalRoot";
import Page from "../../components/Page/Page";
import RTL from "../../components/RTL";
import Restore from "../../pages/Settings/pages/BackupAndRestore/Restore/Restore";
import CustomToastContainer from "../../toasts/CustomToastContainer/CustomToastContainer";

const theme = createTheme(
  {
    direction: "rtl", // Both here and <body dir="rtl">
    typography: {
      useNextVariants: true,
      fontFamily: ["Open Sans", "sans-serif"].join(",")
    },
    palette: {
      primary: {
        main: "rgb(23, 110, 193)"
      },
      secondary: {
        main: "#001120"
      }
    }
  },
  heIL
);

const RestoreWizard = () => {
  return (
    <RTL>
      <MuiThemeProvider theme={theme}>
        <Page>
          <Restore />

          <CustomToastContainer />
          <ModalRoot />
        </Page>
      </MuiThemeProvider>
    </RTL>
  );
};

export default RestoreWizard;
