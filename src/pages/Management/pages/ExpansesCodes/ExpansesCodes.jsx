import React from "react";
import ExpansesCodesTableContainer from "./panels/ExpansesCodesTable/ExpansesCodesTableContainer";
import Page from "../../../../components/Page/Page";
import TitledSection from "../../../../components/Section/TitledSection";
import NavigationPanel from "./NavigationPanel";
import DefaultExpansesCodes from "./panels/DefaultExpansesCodes/DefaultExpansesCodes";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import TableIcon from "../../../../components/Icons/TableIcon";

const TABLE_TITLE = "מעקב וניהול קודי הנהלת חשבונות";

const ExpansesCodes = () => {
  const match = useRouteMatch();

  return (
    <Page>
      <TitledSection
        title={TABLE_TITLE}
        TitleIcon={TableIcon}
        margin="0"
        extraDetails={<NavigationPanel match={match} />}
      >
        <Switch>
          <Route
            path={`${match.path}/קודי הנהלת חשבונות`}
            component={ExpansesCodesTableContainer}
          />
          <Route
            path={`${match.path}/הגדרת קודי ברירת מחדל`}
            component={DefaultExpansesCodes}
          />
        </Switch>
      </TitledSection>
    </Page>
  );
};

export default React.memo(ExpansesCodes);
