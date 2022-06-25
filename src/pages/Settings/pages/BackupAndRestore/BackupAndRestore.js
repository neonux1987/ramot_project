// LIBRARIES
import React from "react";

// CONTAINERS
import BackupContainer from "./Backup/BackupContainer";
import Restore from "./Restore/Restore";
import Page from "../../../../components/Page/Page";

const BackupAndRestore = () => {
  return (
    <Page>
      <BackupContainer />

      <Restore />
    </Page>
  );
};

export default BackupAndRestore;
