import React from "react";
import SystemContainer from "./System/SystemContainer";
import UserContainer from "./User/UserContainer";
import Page from "../../../../components/Page/Page";

export const General = () => {
  return (
    <Page>
      <UserContainer />

      <SystemContainer />
    </Page>
  );
};

export default General;
